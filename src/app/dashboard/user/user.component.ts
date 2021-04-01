import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form/form.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';

import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  [x: string]: any;
  ngOnInit() {
    if (this.per.per('trip_action')) this.displayedColumns.push('action');
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'email',
    'role',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static:false})
  set paginator(value: MatPaginator){
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort, {static:false}) set sort(value: MatSort){
    this.dataSource.sort = value;
  }

  constructor(
    private http: HttpService,
    public per: PermissionsService,
    private formservice: FormService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,


    ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get('/user').subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
  }
 }

  delete(_id ) {
    this.http.delete('/user?_id=' + _id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      //console.log(res);
      this.refreshUsers();
      return this._snackBar.open('Success',"User Deleted", {
        duration: 2000,
      });
    });
  }
  openDialog(dialogcontent){
    const dialogRef = this.dialog.open(dialogcontent, {width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openForm( mode, row?) {
    this.formservice.user_mode=mode;
    this.formservice.user_data=row;
    this.router.navigate(['/dashboard/users/form'] , {relativeTo: this.route})
  }
  passChange(_id) {
    this.formservice.password_reset_id = _id;
    console.log(this.formservice.password_reset_id)
    this.router.navigate(['/passwordreset']);
  }
}
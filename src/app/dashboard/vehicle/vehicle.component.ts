import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form/form.service';
import { HttpService } from 'src/app/services/http/http.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  [x: string]: any;
  ngOnInit() {
    if (this.per.per('vehicle_action')) this.displayedColumns.push('action');
  }

  displayedColumns: string[] = [
    'id',
    'model',
    'vehicle_no',
    'wheeler',
    'maker_comp',
    'type',
    'year',
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
    this.refreshVehicles();
  }

  refreshVehicles() {
    this.http.get('/vehicle').subscribe((res) => {
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

  delete(_id) {
    this.http.delete('/vehicle?_id=' + _id).subscribe((res) => {
      // this.dataSource = new MatTableDataSource(res);
      console.log(res);
      this.refreshVehicles();
      return this._snackBar.open('Success',"Vehicle Entry Deleted", {
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
    this.formservice.vehicle_mode=mode;
    this.formservice.vehicle_data=row;
    this.router.navigate(['/dashboard/vehicles/form'] , {relativeTo: this.route})
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http/http.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { FormService } from "../../services/form/form.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  [x: string]: any;
  ngOnInit() {
    this.fetchMetadata();
    if (this.per.per('trip_approval')) this.displayedColumns.push('approval');
    if (this.per.per('trip_action')) this.displayedColumns.push('action');
    
    //console.log(this.displayedColumns);
  }

  displayedColumns: string[] = [
    'id',
    'status',
    'vehicle_no',
    'driver_name',
    'load_datetime',
    'unload_datetime',
    'duration',
    'from',
    'destination',
    'load_qty',
    'unload_qty',
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
    private auth: AuthService,
    private formservice: FormService,
    private router: Router,
    public per: PermissionsService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  calc(a: string, b: string) {
    const time = new Date(a).getTime() - new Date(b).getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;

    let hours = Math.floor((time / hour) % 24);
    let minutes = Math.floor((time / minute) % 60);
    // let seconds = Math.floor((time / second) % 60);

    return hours + ':' + minutes;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refreshTrips();
  }

  refreshTrips() {
    this.http.get('/trip').subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      //console.log(res);
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
    this.http.delete('/trip?_id=' + _id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      //console.log(res);
      this.refreshTrips();
      return this._snackBar.open('Success',"Trip Deleted", {
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
    this.formservice.trip_mode=mode;
    this.formservice.trip_data=row;
    this.router.navigate(['/dashboard/trips/form'] , {relativeTo: this.route})
  }

  fetchMetadata() {
    //console.log('called');
    this.http.get('/metadata?slug=status').subscribe((res) => {
      // this.dataSource = new MatTableDataSource(res);
      //console.log(res);
      this.refreshTrips();
    });
  }
}

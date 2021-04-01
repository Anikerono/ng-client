import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/services/form/form.service';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
})
export class TripFormComponent implements OnInit {
  // [x: string]: any;
  firstFormGroup: FormGroup;
  isEditable = true;
  driver_name = '';
  public statuses: any[];
  public vehicles: any[];
  public drivers: any[];
  public updatedform: any;
  @ViewChild('picker') picker: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    private auth: AuthService,
    private formservice: FormService,

    
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      status: ['', ],
      vehicle_no: ['', Validators.required],
      driver_id: ['', Validators.required],
      driver_name: ['', Validators.required],
      load_datetime: [new Date(), Validators.required],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      load_qty: ['', Validators.required],
      unload_datetime: [new Date(), ],
      unload_qty: ['', ],
      approval: ['No'],
    });
    this.getstatus();
    this.getVehicles();
    this.getDrivers();
    this.updateValues();
    //console.log(this.formservice);
  }

  getstatus(): void {
    this.http.get('/status').subscribe((result) => {
      this.statuses = result;
    });
  }

  getVehicles(): void {
    this.http.get('/vehicle').subscribe((result) => {
      this.vehicles = result;
    });
  }

  getDrivers(): void {
    this.http.get('/user?role=driver').subscribe((result) => {
      this.drivers = result;
    });
  }

  save(data): void {
    //console.log(this.formservice.trip_mode)
    data.driver_name = this.driver_name;
    data.unload_datetime = new Date(data.unload_datetime);
    data.load_datetime = new Date(data.load_datetime);
    //console.log(data);
    this.http.post('/trip', data).subscribe((res) => {
      //console.log(res);
      if (res.message != 'Trip created')      
          return this._snackBar.open('Error',res.error.message, {
            duration: 2000,
          });
      else {
        this.router.navigate(['/dashboard/trips']);
        return this._snackBar.open('Success',"Trip Created", {
          duration: 2000,
        });
    }
  });
  }

  update(data): void {
    //console.log(data)

    this.http.put('/trip/'+this.formservice.trip_data._id, data).subscribe((res) => {
      //console.log(res);
      if (res.message != 'Trip updated')
          return this._snackBar.open('Error',res.error.message, {
            duration: 2000,
          });
          else {
            this.router.navigate(['/dashboard/trips']);
            return this._snackBar.open('Success',"Trip Updated", {
              duration: 2000,
            });
        }
    });
  }
  rolecheck(): boolean {
    const token = this.auth.getToken();
    const decoded: any = jwt_decode(token);
    const role= decoded.role;
    if(role == "admin" || role == 'ops')  
        return true
    else return false
    
  }
  newForm(){
    if (this.formservice.trip_mode == 'new' )
      return true
    else
      return false
  }

  updateValues() {
    if (this.formservice.trip_mode=='update'){        
        this.firstFormGroup = this._formBuilder.group({
          status: [this.formservice.trip_data.status, Validators.required],
          vehicle_no: [this.formservice.trip_data.vehicle_no, Validators.required],
          driver_id: [this.formservice.trip_data.driver_id, Validators.required],
          driver_name: [this.formservice.trip_data.driver_name, Validators.required],
          load_datetime: [new Date(this.formservice.trip_data.load_datetime), Validators.required],
          from: [this.formservice.trip_data.from, Validators.required],
          destination: [this.formservice.trip_data.destination, Validators.required],
          load_qty: [this.formservice.trip_data.load_qty, Validators.required],
          unload_datetime: [new Date(this.formservice.trip_data.unload_datetime), Validators.required],
          unload_qty: [this.formservice.trip_data.unload_qty, Validators.required],
          approval: [this.formservice.trip_data.approval],
        });
      //console.log(this.firstFormGroup.value)
    }

  }
  back(){
    this.router.navigate(['/dashboard/trips']);
  }
}
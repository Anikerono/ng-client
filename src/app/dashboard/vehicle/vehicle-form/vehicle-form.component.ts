import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form/form.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  [x: string]: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  @ViewChild('picker') picker: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    private formservice: FormService,

  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      model: ['', Validators.required],
      vehicle_no: ['', [Validators.required, Validators.pattern("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$")]],
      wheeler: ['', Validators.required],
      maker_comp: ['', Validators.required],
      type: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
    });
    this.updateValues();
  }

  save(data): void {
    this.http.post('/vehicle', data).subscribe((res) => {
      console.log(res);
      if (res.message != 'Vehicle registration completed')
          return this._snackBar.open('Error',res.error.message, {
            duration: 2000,
          });
      else{
        this._snackBar.open('Saved','New entry', {
          duration: 2000, 
        });
        this.router.navigate(['/dashboard/vehicles']);
      }   
    });
  }
  newForm(){
    if (this.formservice.vehicle_mode == 'new' )
      return true
    else
      return false
  }
  updateValues() {
    if (this.formservice.vehicle_mode=='update'){        
        this.firstFormGroup = this._formBuilder.group({
          model: [this.formservice.vehicle_data.model, Validators.required],
          vehicle_no: [this.formservice.vehicle_data.vehicle_no, [Validators.required, Validators.pattern("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$")]],
          wheeler: [this.formservice.vehicle_data.wheeler, Validators.required],
          maker_comp: [this.formservice.vehicle_data.maker_comp,Validators.required],
          type: [this.formservice.vehicle_data.type, Validators.required],
          year: [this.formservice.vehicle_data.year, [Validators.required, Validators.pattern("^[0-9]{4}$")]],
        });
    }  }

    update(data): void {
      //console.log(data)
      this.http.put('/vehicle/'+this.formservice.vehicle_data._id, data).subscribe((res) => {
        //console.log(res);
        if (res.message != 'Vehicle updated')
            return this._snackBar.open('Error',res.error.message, {
              duration: 2000,
            });
            else {
              this.router.navigate(['/dashboard/vehicles']);
              return this._snackBar.open('Success',"Vehicle Updated", {
                duration: 2000,
              });
          }
      });
    }
    back(){
      this.router.navigate(['/dashboard/vehicles']);
    }
}
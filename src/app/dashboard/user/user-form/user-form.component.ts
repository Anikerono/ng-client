import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  hidep = true;
  hidecp = true;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private _snackBar:MatSnackBar,
    private formservice: FormService,
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', ],
      phone: ['', [Validators.required ,Validators.pattern("^[0-9]{10}$")]],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
    this.updateValues();
  }

  save(data) {
    if (data.password !== data.confirm_password)
    return this._snackBar.open('Error','Passwords do not match !', {
      duration: 2000,
    });
    this.http.post('/user', data).subscribe((res) => {
      console.log(res);
      if (res.message != 'User created')
          return this._snackBar.open('Error',res.error.message, {
            duration: 2000,
          });
      else{  
      this._snackBar.open('Success','User Created', {
        duration: 2000, 
      });  
        this.router.navigate(['/dashboard/users']);
    }});
  }
  newForm(){
    if (this.formservice.user_mode == 'new' )
      return true
    else
      return false
  }
  updateValues() {
    if (this.formservice.user_mode=='update'){        
        this.firstFormGroup = this._formBuilder.group({
          first_name: [this.formservice.user_data.first_name, Validators.required],
          last_name: [this.formservice.user_data.last_name,],
          phone: [this.formservice.user_data.phone, [Validators.required ,Validators.pattern("^[0-9]{10}$")]],
          email: [this.formservice.user_data.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          role: [this.formservice.user_data.role, Validators.required],
        });
    }  }

    update(data): void {
      //console.log(data)
      this.http.put('/user/'+this.formservice.user_data._id, data).subscribe((res) => {
        //console.log(res);
        if (res.message != 'User updated')
            return this._snackBar.open('Error',res.error.message, {
              duration: 2000,
            });
            else {
              this.router.navigate(['/dashboard/users']);
              return this._snackBar.open('Success',"User Updated", {
                duration: 2000,
              });
          }
      });
    }
    back(){
      this.router.navigate(['/dashboard/users']);
    }
  }

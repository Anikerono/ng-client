import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from '../services/form/form.service';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-passwordresetform',
  templateUrl: './passwordresetform.component.html',
  styleUrls: ['./passwordresetform.component.css']
})
export class PasswordresetformComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  save(data) {
    if (!data.password)
      return this._snackBar.open('Error','Enter Password !', {
        duration: 2000,
    });
    if (data.password !== data.confirm_password)
    return this._snackBar.open('Error','Passwords do not match !', {
      duration: 2000,
    });
    this.http.put('/user/passres/'+this.formservice.password_reset_id, data).subscribe((res) => {
      //console.log(res);
      if (res.message != 'Password Changed')
          return this._snackBar.open('Error',res.error.message, {
            duration: 2000,
          });
      else{  
      this._snackBar.open('Success','Password Changed', {
        duration: 2000, 
      });  
        this.router.navigate(['/dashboard/users']);
        this.formservice.password_reset_id="";
    }});
  }
  back(){
    this.router.navigate(['/dashboard/users']);
    this.formservice.password_reset_id="";
    console.log(this.formservice.password_reset_id);
  }
}

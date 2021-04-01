import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  trip_mode = 'new';
  trip_data : any = {};
  user_mode = 'new';
  user_data : any = {};
  vehicle_mode = 'new';
  vehicle_data : any = {};
  password_reset_id : any;
  constructor() { }
}

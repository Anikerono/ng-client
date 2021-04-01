import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  role = '';

  permissions = {
    trip_approval: ['admin', 'ops'],
    trip_action: ['admin', 'ops'],
    user_action: ['admin' , 'ops'],
    vehicle_action: ['admin' , 'ops'],
  };

  constructor(private auth: AuthService) {
    this.update();
  }

  update() {
    this.role = this.auth.getUserData().role;
  }

  per(module) {
    return this.permissions[module].includes(this.role);
  }
}

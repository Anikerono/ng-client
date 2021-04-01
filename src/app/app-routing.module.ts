import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/summary/summary.component';
import { TripFormComponent } from './dashboard/trip/trip-form/trip-form.component';
import { TripComponent } from './dashboard/trip/trip.component';
import { UserFormComponent } from './dashboard/user/user-form/user-form.component';
import { UserComponent } from './dashboard/user/user.component';
import { VehicleFormComponent } from './dashboard/vehicle/vehicle-form/vehicle-form.component';
import { VehicleComponent } from './dashboard/vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PasswordresetformComponent } from './passwordresetform/passwordresetform.component';
import { CustomerComponent } from './dashboard/customer/customer.component';
import { SitesComponent } from './dashboard/sites/sites.component';
import { SettingsComponent } from './dashboard/settings/settings.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordreset', component: PasswordresetformComponent,  canActivate: [AuthGuardService], },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: SummaryComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'trips',
        component: TripComponent,
      },
      {
        path: 'vehicles',
        component: VehicleComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'sites',
        component: SitesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: 'users/form', component: UserFormComponent },
      { path: 'trips/form', component: TripFormComponent },
      { path: 'vehicles/form', component: VehicleFormComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

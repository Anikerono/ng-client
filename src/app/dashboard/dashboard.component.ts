import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private Auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.Auth.removeToken();
    this.router.navigate(['/login']);
  }
}

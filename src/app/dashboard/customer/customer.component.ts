import { Component, OnInit } from '@angular/core';
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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

}

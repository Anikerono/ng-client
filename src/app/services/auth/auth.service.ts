import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private url: UrlService) {}

  login(phone: string, password: string): Observable<any> {
    return this.http
      .post(this.url.baseUrl + '/login', {
        phone,
        password,
      })
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('jwt_token');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('jwt_token');
  }
  
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  isAdmin(token?: string): boolean {
    token = this.getToken();
    if (!token) return false;

    const user = this.getUserData();
    return user.role_type == 'admin';
  }

  getUserData(): any {
    let token = this.getToken();
    const decoded = jwt_decode(token);
    return decoded;
  }
}

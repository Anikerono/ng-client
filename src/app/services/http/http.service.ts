import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token: string = '';

  private httpOptions: any = {
    headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
  };

  private refreshToken(): void {
    this.token = this.auth.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    };
  }

  get(url: string): Observable<any> {
    this.refreshToken();
    return this.http.get(this.url.baseUrl + url, this.httpOptions).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  post(url: string, data: any): Observable<any> {
    this.refreshToken();
    return this.http
      .post<any>(this.url.baseUrl + url, data, this.httpOptions)
      .pipe(
        catchError((err) => {
          return of(err);
        })
      );
  }

  delete(url: string): Observable<any> {
    this.refreshToken();
    return this.http.delete<any>(this.url.baseUrl + url, this.httpOptions).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  put(url: string, data: any): Observable<any> {
    this.refreshToken();
    return this.http
      .put<any>(this.url.baseUrl + url, data, this.httpOptions)
      .pipe(
        catchError((err) => {
          return of(err);
        })
      );
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private url: UrlService
  ) {}
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';

interface TokenResult {
  token: string;
  expiration: Date;
}
@Injectable()
export class AuthService {
  private url = environment.url;
  constructor(private http: HttpClient, private router: Router) {
    this.url += 'auth/';
  }

  login(model: LoginModel) {
    return this.http.post<Result<TokenResult>>(this.url + 'login', model).pipe(
      tap((x) => {
        console.log(this.parseJwt(x.Data.token));
      })
    );
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}

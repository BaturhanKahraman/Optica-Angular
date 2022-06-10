import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
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
  private url = environment.url+'auth/';
  public user = new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient, private router: Router) {
  }

  autoLogin(){
    const jwtToken =localStorage.getItem('userData');
    if(!jwtToken)
      return;
    this.handleAuth(jwtToken);
  }

  isAuth(){
    if(this.user.getValue())
      return true;
    return false;
  }

  login(model: LoginModel) {
    return this.http.post<Result<TokenResult>>(this.url + 'login', model).pipe(
      tap((x) => {
        this.handleAuth(x.data.token);
        localStorage.setItem("userData",x.data.token);
        this.router.navigateByUrl("/");
      })
    );
  }

  handleAuth(token:string) {
    let jwt = this.parseJwt(token);
    let user = this.getUserFromJwt(jwt);
    this.user.next(user);
  }

  getUserFromJwt(jwt:any){
    return new User(
      jwt["email"],
      jwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    )
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

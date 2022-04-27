import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("response int");
    
    return next.handle(req).pipe(
      catchError(this.handleError.bind(this))
    )
  }
  
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';        
    if (errorRes.error) {
      errorMessage=errorRes.error;
    }      
    this.snackBar.open(errorMessage);
    return throwError(()=>new Error(errorMessage));
  }
}

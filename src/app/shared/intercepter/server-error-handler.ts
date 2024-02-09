import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/services/auth/token.storage';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private tokenService: TokenStorage){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            this.tokenService.signOut();
            this.router.navigate(['/auth/sign-in'])
        }else {
          return throwError(error);
        }
      })
    );    
  }
}
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { TokenStorage } from './token.storage';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  user: User;
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginDataSource = new BehaviorSubject<User | null>(null);
  loginData = this.loginDataSource.asObservable();
  loginUser: any = null;
  APICalling = false;

  public changeLoginData(user: any) {
    localStorage.setItem('USER', (JSON.stringify(user)));
    let userData = localStorage.getItem('USER') || null;
    let loginUserData = (userData) ? JSON.parse(userData) : null;
    this.loginUser = loginUserData;
    this.loginDataSource.next(loginUserData);
  }

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private ngZone: NgZone, private router: Router) {
    if (localStorage.getItem('USER')) {
      let userData = localStorage.getItem('USER') || null;
      let loginUserData = (userData) ? JSON.parse(userData) : null;
      if (loginUserData) {
        this.changeLoginData(loginUserData);
      }
    }

    if (environment.autoLogout) {
      this.lastAction(Date.now());
      this.check();
      this.initListener();
      this.initInterval();
    }


  }

  login(params: any): Observable<any> {
    console.log('params', params)
    this.APICalling = true;
    let request = {
      email: params.email,
      password: params.password,
    }
    return new Observable((observer) => {
      this.http.post(environment.API_URL + '/common/login', request).subscribe((data: any) => {
        this.APICalling = false;
        if (data.data != undefined && data.token != undefined) {
          if (params.remember) {
            localStorage.setItem('rem', (JSON.stringify(params)))
          } else {
            localStorage.setItem('rem', null)
          }
          this.saveUser(data.data);
          this.tokenStorage.saveToken(data.token, params.remember);
        }
        observer.next(data);
        observer.complete();
      })
    });
  }

  get isAdmin(): boolean {
    return this.loginUser.role==='Admin'
  }
  saveUser(user: any): void {
    localStorage.setItem('USER', (JSON.stringify(user)));
    let userData = localStorage.getItem('USER') || null;
    let loginUserData = (userData) ? JSON.parse(userData) : null;
    (<any>window).user = loginUserData;
    this.changeLoginData(loginUserData);
  }

  me(): Observable<User | null> {
    return this.http.get<AuthResponse>(environment.API_URL + '/api/auth/me').pipe(
      tap(({ user }) => this.saveUser(user)),
      pluck('user'),
      catchError(() => of(null)),
    );
  }
  signOut(): void {
    this.tokenStorage.signOut();
    this.saveUser(null);
    localStorage.clear();
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  //Timer Logout


  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    })
  }

  /**
   * reset timer
   */
  reset() {
    this.lastAction(Date.now());
  }

  getUserId(){
    return this.loginUser._id
  }
  getUserData(){
    return this.loginUser
  }
  /**
   * check timer
   */
  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + (5) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    console.log('isTimeout', isTimeout)
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout) {
        localStorage.removeItem('lastAction');
        setTimeout(() => {
          console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        }, 10000);
        this.signOut();
      }
    });
  }






}

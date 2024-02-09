import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private tokenKey = 'kiklikAuthToken';
  private remember: Boolean = false;

  constructor(private router: Router){}

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/'])
  }

  saveToken(token: string, remember: boolean): void {
    if (!token) return;
    if (remember) {
      localStorage.setItem('rememberMe', 'yes')
    } else {
      localStorage.setItem('rememberMe', 'no')
    }
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    let token: string = '';
    token = localStorage.getItem(this.tokenKey);
    return token
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorage } from '../../services/auth/token.storage';
@Injectable({ providedIn: 'root' })
export class ModuleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private token: TokenStorage) { }
  canActivate(route: ActivatedRouteSnapshot) {
    console.log('============> route.snapshot.data.', route.data)
    const module = route.data.module
    const tokenVal = this.token.getToken();
    console.log(' Guard tokenVal', tokenVal)
    if (!tokenVal || tokenVal == '') {
      // this.router.navigateByUrl('/auth/sign-in');
      return false;
    }

    const user = this.authService.loginUser;

    // if (user.role !=='Client') {
    //   this.router.navigateByUrl('/auth/sign-in');
    //   return false;
    // }

    if (user.modules?.includes(module)) {
      return true
    } else {
      this.router.navigateByUrl('/client/error/missing');
      return false
    }
  }
}

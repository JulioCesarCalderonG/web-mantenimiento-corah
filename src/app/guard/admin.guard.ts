import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthAdminService } from '../services/auth-admin.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router, private authService: AuthAdminService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token) {
      const dataDecode: any = this.decodeToken();
      const date = new Date();

      if (!dataDecode || !dataDecode.exp || dataDecode.exp < date.getTime() / 1000) {
        return this.redirect();
      }
      return true;
    }
    return this.redirect();
  }

  redirect() {
    this.router.navigate(['/auth/admin']);
    return false;
  }

  decodeToken() {
    try {
      return jwtDecode(`${this.authService.getToken()}`);
    } catch {
      return null;
    }
  }
}

export const adminGuard: CanActivateChildFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};

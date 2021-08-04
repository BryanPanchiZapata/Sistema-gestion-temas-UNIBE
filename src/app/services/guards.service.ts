import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const role = this.authService.getRole();
    if (this.authService.getToken() === '' || this.authService.getToken() === null){
      this.router.navigate(['/login'])
    } else if (expectedRol.indexOf(role) === -1) {
      return false;
    } else {
      this.router.navigate(['/'])
    }
    return true;
  }
}

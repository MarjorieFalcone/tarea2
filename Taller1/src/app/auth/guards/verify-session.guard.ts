import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerifySessionGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }

    return this.authService.isLoggedIn;
  }
  canLoad(): Observable<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }

    return this.authService.isLoggedIn;
  }
}

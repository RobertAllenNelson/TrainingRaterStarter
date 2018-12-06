import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastManager: ToastsManager,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean> {
        const isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.toastManager.error('Please login');
            this.router.navigate(['login']);
        }
        return Observable.of(isAuthenticated);
    }

}

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authService) {
            this.authService = this.injector.get(AuthService);
        }

        const token = this.authService.token;

        if (token) {
            const headers = {
                'Authorization': token,
            };

            const dupRequest = request.clone({
                setHeaders: headers,
            });

            return next.handle(dupRequest);
        } else {
            return next.handle(request);
        }

    }

}

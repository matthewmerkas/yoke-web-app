import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const authToken = localStorage.getItem('access_token');
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + authToken
            }
        });
        return next.handle(request);
    }
}

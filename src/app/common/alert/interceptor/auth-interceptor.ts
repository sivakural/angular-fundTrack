import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        const authToken: any = this.auth.getAuthorizationToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        req = req.clone({
            headers: req.headers.set('Access-Control-Allow-Origin', '*')
        });
        
        if (authToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
        }

        return next.handle(req).pipe(
            tap((res: any) => {
                if (res instanceof HttpResponseBase) {
                    const token: any = res.headers.get("Authorization");
                    if (token) localStorage.setItem("Authorization", token);
                }
            })
        )
    }
}
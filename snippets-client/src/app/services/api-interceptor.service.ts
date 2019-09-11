import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { snakecaseKeys, camelizeKeys } from 'src/app/shared/utils/camelize';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor, OnDestroy {
  authSub: Subscription;
  token: string = null;

  constructor(private authService: AuthenticationService) {
    this.authSub = this.authService.authState.subscribe(authDat => {
      this.token = authDat.token;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.token}`
        }
      });
    }
    const reqBodySnake = snakecaseKeys(request.body);
    request = request.clone({ body: reqBodySnake });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const camelCaseObject = camelizeKeys(event.body);
          const modEvent = event.clone({ body: camelCaseObject });
          return modEvent;
        } else {
          return event;
        }
      })
    );
  }
}

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/structs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '@core/services/notification.service';
import { RouterService } from '@core/services/router.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private routerService: RouterService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          this.router.navigate([`/${Path.SignIn}`], {
            queryParams: { returnUrl: this.routerService.getPreviousUrl() },
          });
          return throwError(error);
        }
        console.error(error);
        this.notificationService.error('Có lỗi xảy ra, vui lòng thử lại!');
        return throwError(error);
      }),
    );
  }
}

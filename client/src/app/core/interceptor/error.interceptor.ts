import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 404) {
          // Handle 404 error here and show a toastr message
          this.router.navigate(['/not-found']);
          this.toastr.error('Page not found', 'Error 404');

        } else if (error.status === 500) {
          // Handle 500 error here and show a toastr message
          this.router.navigate(['/server-error']);
          this.toastr.error('Server error', 'Error 500');
        }

        // Rethrow the error for further handling, if needed
        throw error;
      })
    );
  }
}

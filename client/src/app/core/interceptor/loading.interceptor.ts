import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
// Import your loading service

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show loading spinner
    this.loadingService.loading();

    return next.handle(req).pipe(
      delay(1000),
      // Hide loading spinner when the request is complete (successful or with an error)
      finalize(() => {
        this.loadingService.idle();
      })
    );
  }
}

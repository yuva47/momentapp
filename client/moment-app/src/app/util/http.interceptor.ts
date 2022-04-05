import { SpinnerComponent } from './spinner/spinner.component';
import { CommonService } from 'src/app/util/common.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToastService,
    private matDialog: MatDialog,
    private router: Router,
    private common: CommonService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            if (event.body?.message) {
              this.toast.showMessage(event.body.message, 0);
            }
          }
        },
        (error: any) => {
          this.toast.showMessage('Error : ' + error.error.message, 1);
          if (error.status == 401) {
            this.common.user = null;
            this.router.navigate(['/login']);
          }
          this.matDialog.closeAll();
        }
      )
    );
  }
}

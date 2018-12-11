import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from "../components/error-dialog/error-dialog.component";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if (err.error === 'Unauthorized') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    location.href = "/";
                }
            } else if (err.status === 400 || err.status === 404) {
                const dialogRef = this.dialog.open(ErrorDialogComponent, {
                    width: '600px',
                    data: err.error,
                    id: 'infoDialog'
                });
                dialogRef.afterClosed().subscribe(() => {
                   if(err.status === 404) {
                       location.href = "/";
                   }
                });
            } else if (err.status === 500) {
                const dialogRef = this.dialog.open(ErrorDialogComponent, {
                    width: '600px',
                    data: 'Wystąpił błąd podczas wykonywania operacji',
                    id: 'infoDialog'
                });
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

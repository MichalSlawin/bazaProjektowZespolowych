import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog} from '@angular/material';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if (err.error === 'Unauthorized') {
                    localStorage.removeItem('token');
                    // location.reload(true);
                    location.href = "/";
                } else {
                    console.log("Złe dane logowania")
                }
            } else if (err.status === 400) {
                console.log(err.error);
            } else if (err.status === 500) {
                console.log("Błąd wykonywania operacji");
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

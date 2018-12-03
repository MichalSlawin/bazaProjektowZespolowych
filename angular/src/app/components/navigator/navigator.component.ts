import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog} from "@angular/material";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit{

    isLoggedIn = false;
    roleName = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}

  showLogin() {
      const dialogRef = this.dialog.open(LoginComponent, {
          width: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              window.location.reload();
          }
      });
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.reload();
  }

    ngOnInit() {
      if(localStorage.getItem('token') && localStorage.getItem('role')) {
          this.roleName = localStorage.getItem('role');
          this.isLoggedIn = true;
      }
    }

  }

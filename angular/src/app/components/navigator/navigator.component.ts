import {Component, HostBinding, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog} from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit{

    isLoggedIn = false;
    roleName = '';
    lightTheme = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

@HostBinding('class') componentCssClass;

  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog,
              public overlay: OverlayContainer) {}

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
        const theme = localStorage.getItem('theme') === null ? 'dark-theme' : localStorage.getItem('theme');
        if(theme === 'dark-theme') {
            this.lightTheme = false;
            this.overlay.getContainerElement().classList.remove("light-theme");
            this.overlay.getContainerElement().classList.add("dark-theme");
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        } else {
            this.lightTheme = true;
            this.overlay.getContainerElement().classList.remove("dark-theme");
            this.overlay.getContainerElement().classList.add("light-theme");
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        }
    }

    onSetTheme() {
        if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
            this.overlay.getContainerElement().classList.remove("dark-theme");
            this.overlay.getContainerElement().classList.add("light-theme");
            localStorage.setItem('theme', 'light-theme');
        } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
            this.overlay.getContainerElement().classList.remove("light-theme");
            this.overlay.getContainerElement().classList.add("dark-theme");
            localStorage.setItem('theme', 'dark-theme');
        }

        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        } else if (document.body.classList.contains("light-theme")) {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        }
    }
  }

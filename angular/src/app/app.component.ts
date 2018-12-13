import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {MatDialog} from "@angular/material";
import {CreditsComponent} from "./components/credits/credits.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private user: UserService, private dialog: MatDialog, private elementRef:ElementRef) {
      document.addEventListener('keyup', (event) => {
        if(event.keyCode == 81 && event.ctrlKey) {
            this.credits();
        }
      });

      document.addEventListener('click', (event) => {
         if(event.detail == 5) {
             this.credits();
         }
      });
  }

  credits() {
      this.dialog.open(CreditsComponent, {
          width: '500px'
      });
  }

  ngOnInit() {
    if(localStorage.getItem('token')) {
        this.user.checkToken().subscribe();
    }

  }
}

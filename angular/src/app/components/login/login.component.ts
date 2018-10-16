import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

  constructor() { }

    ngOnInit() {
    }

    login() : void {
        if(this.username == 'admin' && this.password == 'admin') {
            alert("Git");
            // this.router.navigate(["user"]);
        } else {
            alert("Invalid credentials");
        }
    }
}

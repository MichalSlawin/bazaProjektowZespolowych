import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    loader = false;

  constructor(public dialogRef: MatDialogRef<any>, private userService: UserService) { }

    ngOnInit() {
    }

    close(state) {
        this.dialogRef.close(state);
    }

    login() : void {
        this.loader = true;
        const data = {
            username: this.username,
            password: this.password
        };
        this.userService.login(data).subscribe((data) => {
           this.loader = false;
           localStorage.setItem("token", data['token']);
           localStorage.setItem("role", data['role']);
           this.close(true);
        }, error => {
            console.log('Fail');
            console.log(error);
        });
    }
}

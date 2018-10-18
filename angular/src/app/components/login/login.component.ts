import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    loader = false;

  constructor(public dialogRef: MatDialogRef<any>) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    login() : void {
        this.loader = true;
        if(this.username == 'admin' && this.password == 'admin') {
            alert("Git");
            // this.router.navigate(["user"]);
        } else {
            alert("Invalid credentials");
        }
    }
}

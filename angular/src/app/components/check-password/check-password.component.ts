import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent implements OnInit {

    password: string;

    constructor(public dialogRef: MatDialogRef<CheckPasswordComponent>) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close(false);
    }

    checkPassword(): void {
        this.dialogRef.close(this.password === 'test');
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent implements OnInit {

    password: string;

    constructor(public dialogRef: MatDialogRef<CheckPasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private message: MessageService) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close(false);
    }

    checkPassword(): void {
        this.data['password'] = this.password;
        this.message.sendMessage(this.data).subscribe((data) => {
            this.dialogRef.close(true);
        }, error1 => {
            this.dialogRef.close(false);
        });
    }
}

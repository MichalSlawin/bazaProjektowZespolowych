import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CheckPasswordComponent} from '../check-password/check-password.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  formControlSubject = new FormControl();
  formControlBody = new FormControl();
  formControlPublic = new FormControl();

  data = {
    subject: '',
    body: '',
    is_public: false
  };

  checkPasswordDialogRef: MatDialogRef<CheckPasswordComponent>;

  constructor(public dialogRef: MatDialogRef<NewMessageComponent>, public snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
  }

    close() {
        this.dialogRef.close();
    }

    send() {

        this.data.subject = this.formControlSubject.value;
        this.data.body = this.formControlBody.value;
        if (this.formControlPublic.value == null) {
          this.data.is_public = false;
        } else {
            this.data.is_public = this.formControlPublic.value;
        }

        if (this.data.subject == null || this.data.subject === '') {
            this.openSnackBar('Podaj tytuł wiadomości');
        } else if (this.data.body == null || this.data.body === '') {
            this.openSnackBar('Podaj treść wiadomości');
        } else {
            this.checkPassword();
        }
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Zamknij', {
            duration: 2000,
        });
    }

    checkPassword() {
        this.checkPasswordDialogRef = this.dialog.open(CheckPasswordComponent, {
            width: '600px',
            data: this.data
        });

        this.checkPasswordDialogRef.afterClosed().subscribe(isPasswordCorrect => {
                if (isPasswordCorrect) {
                    this.dialogRef.close();
                    this.openSnackBar('Wiadomość wysłana');
                } else {
                    this.openSnackBar('Nieprawidłowe hasło');
                }
        });
    }
}

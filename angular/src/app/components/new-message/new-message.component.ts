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
  formControlRecipient = new FormControl();
  formControlTitle = new FormControl();
  formControlContent = new FormControl();
  formControlPublic = new FormControl();

  data = {
    recipient: '',
    title: '',
    content: '',
    isPublic: false
  };

  checkPasswordDialogRef: MatDialogRef<CheckPasswordComponent>;

  constructor(public dialogRef: MatDialogRef<NewMessageComponent>, public snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
  }

    close() {
        this.dialogRef.close();
    }

    send() {

        this.data.recipient = this.formControlRecipient.value;
        this.data.title = this.formControlTitle.value;
        this.data.content = this.formControlContent.value;
        if (this.formControlPublic.value == null) {
          this.data.isPublic = false;
        } else {
            this.data.isPublic = this.formControlPublic.value;
        }

        // if (this.data.recipient == null || this.data.recipient === '') {
        //   this.openSnackBar('Podaj odbiorcę wiadomości');
        // } else
        if (this.data.title == null || this.data.title === '') {
            this.openSnackBar('Podaj tytuł wiadomości');
        } else if (this.data.content == null || this.data.content === '') {
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
            width: '600px'
        });

        this.checkPasswordDialogRef.afterClosed().subscribe(isPasswordCorrect => {
                if (isPasswordCorrect) {
                    console.log(this.data);
                    this.dialogRef.close();
                    this.openSnackBar('Wiadomość wysłana');
                } else {
                    this.openSnackBar('Nieprawidłowe hasło');
                }
        });
    }
}

import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user.service';
import { NgxWigComponent } from 'ngx-wig';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

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

  constructor(public dialogRef: MatDialogRef<any>, public snackBar: MatSnackBar) {}

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
            console.log(this.data);
            this.dialogRef.close();
        }
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Zamknij', {
            duration: 2000,
        });
    }
}

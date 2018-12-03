import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewMessageComponent} from "../new-message/new-message.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

    panelOpenState = false;
    formControlSubjectFilter = new FormControl();

    @Input('projectMessages') messages;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  compose() {
      const dialogRef = this.dialog.open(NewMessageComponent, {
          width: '800px'
      });
  }

    clearSubject() {
        this.formControlSubjectFilter.setValue('');
    }

}

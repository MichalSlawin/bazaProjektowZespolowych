import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material";
import {NewMessageComponent} from "../new-message/new-message.component";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  compose() {
      const dialogRef = this.dialog.open(NewMessageComponent, {
          width: '800px'
      });
  }

}

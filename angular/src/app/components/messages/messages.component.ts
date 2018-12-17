import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    @Input('projectId') projectId;
    @Input('projectOwner') projectOwner;
    @Input('projectWorker') projectWorker;

    @Output() messageEvent = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  refreshMessages() {
      this.messageEvent.emit(true);
  }

  compose() {
      const dialogRef = this.dialog.open(NewMessageComponent, {
          width: '800px',
          data: this.projectId
      });

      dialogRef.afterClosed().subscribe((result) => {
         this.refreshMessages();
      });
  }

    clearSubject() {
        this.formControlSubjectFilter.setValue('');
    }

}

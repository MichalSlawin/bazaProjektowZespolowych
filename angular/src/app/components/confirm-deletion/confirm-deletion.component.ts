import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeletionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

    close() {
        this.dialogRef.close(false);
    }
    confirm() {
        this.dialogRef.close(true);
    }

}

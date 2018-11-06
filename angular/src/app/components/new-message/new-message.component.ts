import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {UserService} from "../../services/user.service";
import { NgxWigComponent } from "ngx-wig";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  text1 = 'dupa';

  constructor(public dialogRef: MatDialogRef<any>, private userService: UserService) {}

  ngOnInit() {
  }

}

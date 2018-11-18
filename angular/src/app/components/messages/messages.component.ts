import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material";
import {NewMessageComponent} from "../new-message/new-message.component";
import {Message} from "../../message";
import {MatExpansionModule} from '@angular/material/expansion';
import {Observable, of} from 'rxjs';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

    panelOpenState = false;
    messages = EXAMPLE_MESSAGES;
    formControlTitleFilter = new FormControl();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  compose() {
      const dialogRef = this.dialog.open(NewMessageComponent, {
          width: '800px'
      });
  }

    clearTitle() {
        this.formControlTitleFilter.setValue('');
    }

}

// Dane testowe:
export const EXAMPLE_MESSAGES: Message[] = [
    {
        sender: 'jan@kowal.gmail.com',
        recipient: 'ja',
        sendDate: "2018-10-22",
        title: 'promocja',
        content: 'Wyprawka szkolna 2018: Zobacz, gdzie można kupić najtaniej artykuły szkolne. Jakie promocje przygotowały największe sklepy?. Gdzie wyprawka szkolna wyjdzie najtaniej? Sprawdź promocje na zeszyty, plecaki czy kredki w Biedronce, Carrefourze i Kauflandzie ZESZYTY BIEDRONKA 2018. WYPRAWKA SZKOLNA 2018 PROMOCJE\n' +
            '\n' +
            'Czytaj więcej: https://dziennikzachodni.pl/wyprawka-szkolna-2018-biedronka-kaufland-carrefour-gdzie-jest-najtaniej-jak-tanio-skompletowac-wyprawke-szkolna/ar/13435668',
        isPublic: true
    },
    {
        sender: 'ja',
        recipient: 'jan@kowal.gmail.com',
        sendDate: "2018-11-22",
        title: 'nie dzieki',
        content: 'nie mam czasu',
        isPublic: true
    },
    {
        sender: 'opiekun',
        recipient: 'ja',
        sendDate: "2018-11-02",
        title: 'do roboty',
        content: 'pisac projekt',
        isPublic: true
    },

];

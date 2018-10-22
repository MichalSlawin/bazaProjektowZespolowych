import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    entries = [
        {
            header: 'Zaakceptowano projekt',
            content: 'Projekt został zaakceptowany przez Osoba 2',
            date: "2018-10-02 13:25"
        }, {
            header: 'Przesłano do akceptacji',
            content: 'Projekt został wysłany do Osoba 2 do akceptacji',
            date: "2018-10-02 12:50"
        }, {
            header: 'Utworzono projekt',
            content: 'Projekt został utworzony',
            date: "2018-10-01 15:12"
        }
    ];

  constructor() { }

  ngOnInit() {

  }


}

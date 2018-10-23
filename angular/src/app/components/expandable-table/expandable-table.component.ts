import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Project} from '../../project';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-expendable-table',
  styleUrls: ['./expandable-table.component.scss'],
  templateUrl: './expandable-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandableTableComponent {

  constructor() {}

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['indeks', 'nazwa', 'pod_mentoringiem', 'opiekun', 'technologie'];
  expandedElement: Project;
}

const ELEMENT_DATA: Project[] = [
  {
  indeks: 1,
  nazwa: 'Sklep sportowy',
  pod_mentoringiem: true,
  opiekun: 'Anna Wyborna',
  technologie: 'Angular6, Laravel',
  opis: 'Aplikacja sklep sportowy do przeglądanie i kupowania produktów sportowych.',
  uczestnicy: 'Jan Kowalski, Marcin Nowak'
  }, {
  indeks: 2,
  nazwa: 'Aplikacja do biegania',
  pod_mentoringiem: false,
  opiekun: 'Marian Piotrowski',
  technologie: 'Android',
  opis: 'Aplikacja mobilna pozwalająca użytkownikowi mierzyć i zapisywać czasy i odległości swoich biegów',
  uczestnicy: 'Anna Szymańska, Dorota Cieślak'
  },
];

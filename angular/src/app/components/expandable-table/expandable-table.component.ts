import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Project} from '../../project';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

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

    export class ExpandableTableComponent implements OnInit {

    dataSource = new MatTableDataSource<Project>(ELEMENT_DATA);
    columnsToDisplay = ['indeks', 'nazwa', 'pod_mentoringiem', 'opiekun', 'technologie'];
    expandedElement: Project;

    myControlYear = new FormControl();
    myControlLanguage = new FormControl();
    years: string[] = ['2016', '2017', '2018'];
    filteredOptionsYear: Observable<string[]>;

    allLanguages: string[] = ['Java Spring', 'Java EE', 'PHP', 'Python', 'C#', 'C++', 'C', 'Android'];
    filteredOptionsLanguage: Observable<string[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor() {}

        ngOnInit() {
            this.dataSource.paginator = this.paginator;

            this.filteredOptionsYear = this.myControlYear.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterYear(value))
                );
            this.filteredOptionsLanguage = this.myControlLanguage.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterLanguage(value))
                );
        }

        private _filterYear(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.years.filter(option => option.toLowerCase().includes(filterValue));
        }

        private _filterLanguage(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.allLanguages.filter(option => option.toLowerCase().includes(filterValue));
        }

        applyFilterNameDescription(filterValue: string) {
            this.dataSource.filterPredicate = function(data, filter: string): boolean {
                return data.nazwa.toLowerCase().includes(filter) || data.opis.includes(filter);
            };
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

        applyFilterRok(filterValue: string) {
            this.dataSource.filterPredicate = function(data, filter: string): boolean {
                return data.rok.toString().includes(filter);
            };
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

        // TODO: dodać select z autocomplete
        applyFilterTechnology(filterValue: string) {
            this.dataSource.filterPredicate = function(data, filter: string): boolean {
                return data.technologie.toString().toLowerCase().includes(filter);
            };
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

        // TODO: umożliwić działanie filtru po mentoringu (checkbox)
        applyFilterMentoring(isChecked) {
            this.dataSource.filterPredicate = function(data, filter: string): boolean {
                return data.pod_mentoringiem.toString().includes(filter);
            };
            if(isChecked === false) {
                this.dataSource.filter = "";
            }
            else {
                this.dataSource.filter = isChecked.toString().trim().toLowerCase();
            }
        }
    }
// Dane testowe:
const ELEMENT_DATA: Project[] = [
    {
        indeks: 1,
        nazwa: 'Sklep sportowy',
        pod_mentoringiem: true,
        opiekun: 'Anna Wyborna',
        technologie: ['Angular6', 'Laravel'],
        opis: 'Aplikacja sklep sportowy do przeglądanie i kupowania produktów sportowych.',
        uczestnicy: 'Jan Kowalski, Marcin Nowak',
        rok: 2018
    },
    {
        indeks: 2,
        nazwa: 'Aplikacja do biegania',
        pod_mentoringiem: false,
        opiekun: 'Marian Piotrowski',
        technologie: ['Android'],
        opis: 'Aplikacja mobilna pozwalająca użytkownikowi mierzyć i zapisywać czasy i odległości swoich biegów',
        uczestnicy: 'Anna Szymańska, Dorota Cieślak',
        rok: 2017
    },
    {
        indeks: 3,
        nazwa: 'Sklep',
        pod_mentoringiem: true,
        opiekun: 'Marian Piotrowski',
        technologie: ['Android'],
        opis: 'aplikacja do zarzadzania sklepem',
        uczestnicy: 'studenci',
        rok: 2018
    },
    {
        indeks: 4,
        nazwa: 'Aplikacja',
        pod_mentoringiem: false,
        opiekun: 'Anna Wyborna',
        technologie: ['Laravel'],
        opis: 'aplikacja do zarzadzania sklepem',
        uczestnicy: 'studenci',
        rok: 2017
    },
    {
        indeks: 5,
        nazwa: 'test1',
        pod_mentoringiem: true,
        opiekun: 'test1',
        technologie: ['Java'],
        opis: 'test1',
        uczestnicy: 'test1',
        rok: 2016
    },
    {
        indeks: 6,
        nazwa: 'test2',
        pod_mentoringiem: true,
        opiekun: 'test2',
        technologie: ['Java Spring'],
        opis: 'test2',
        uczestnicy: 'test2',
        rok: 2016
    },
    {
        indeks: 7,
        nazwa: 'test3',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 8,
        nazwa: 'test4',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 9,
        nazwa: 'test5',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 10,
        nazwa: 'test6',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 11,
        nazwa: 'test7',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 12,
        nazwa: 'test8',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
    {
        indeks: 13,
        nazwa: 'test9',
        pod_mentoringiem: false,
        opiekun: 'test3',
        technologie: ['Java Spring'],
        opis: 'test3',
        uczestnicy: 'test3',
        rok: 2017
    },
];

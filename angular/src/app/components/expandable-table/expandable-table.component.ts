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
    columnsToDisplay = ['id', 'name', 'mentoring', 'curator', 'technologies'];
    expandedElement: Project;

    formControlYear = new FormControl();
    formControlTechnology = new FormControl();
    formControlNameDescription = new FormControl();
    formControlMentoring = new FormControl();

    years: string[] = ['2016', '2017', '2018'];
    filteredOptionsYear: Observable<string[]>;

    allTechnologies: string[] = ['Java Spring', 'Java EE', 'PHP', 'Python', 'C#', 'C++', 'C', 'Android'];
    filteredOptionsTechnology: Observable<string[]>;

    filteredValues = {
        name: "",
        description: "",
        year: "",
        technology: "",
        mentoring: ""
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {}

        ngOnInit() {
            this.dataSource.paginator = this.paginator;

            this.filteredOptionsYear = this.formControlYear.valueChanges.pipe(
                    startWith(''),
                    map(value => this._filterYear(value))
                );
            this.filteredOptionsTechnology = this.formControlTechnology.valueChanges.pipe(
                    startWith(''),
                    map(value => this._filterTechnology(value))
                );

            this.dataSource.filterPredicate = this.customFilterPredicate();
        }

        private customFilterPredicate() {
            const myFilterPredicate = (data: Project, filter: string): boolean => {
                let searchString = JSON.parse(filter);
                return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
                    data.description.toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1
                    && data.year.toString().trim().toLowerCase().indexOf(searchString.year.toLowerCase()) !== -1 &&
                    data.technologies.toString().trim().toLowerCase().indexOf(searchString.technology.toLowerCase()) !== -1
                    && data.mentoring.toString().trim().toLowerCase().indexOf(searchString.mentoring.toLowerCase()) !== -1;
            }
            return myFilterPredicate;
        }

        private _filterYear(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.years.filter(option => option.toLowerCase().includes(filterValue));
        }

        private _filterTechnology(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.allTechnologies.filter(option => option.toLowerCase().includes(filterValue));
        }

        applyFilterNameDescription(filterValue: string) {
            // this.dataSource.filterPredicate = function(data, filter: string): boolean {
            //     return data.name.toLowerCase().includes(filter) || data.description.includes(filter);
            // };
            // this.dataSource.filter = filterValue.trim().toLowerCase();
            this.filteredValues['name'] = filterValue.trim().toLowerCase();
            this.filteredValues['description'] = filterValue.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterRok(filterValue: string) {
            // this.dataSource.filterPredicate = function(data, filter: string): boolean {
            //     return data.year.toString().includes(filter);
            // };
            // this.dataSource.filter = filterValue.trim().toLowerCase();
            this.filteredValues['year'] = filterValue.toString().trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterTechnology(filterValue: string) {
            // this.dataSource.filterPredicate = function(data, filter: string): boolean {
            //     return data.technologies.toString().toLowerCase().includes(filter);
            // };
            // this.dataSource.filter = filterValue.trim().toLowerCase();
            this.filteredValues['technology'] = filterValue.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterMentoring(isChecked) {
            // this.dataSource.filterPredicate = function(data, filter: string): boolean {
            //     return data.mentoring.toString().includes(filter);
            // };
            if(isChecked === false) {
                this.filteredValues['mentoring'] = "";
            }
            else {
                this.filteredValues['mentoring'] = "true";
            }
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        clearFilters() {
            this.dataSource.filter = "";

            this.filteredValues.name = "";
            this.filteredValues.description = "";
            this.filteredValues.year = "";
            this.filteredValues.technology = "";
            this.filteredValues.mentoring = "";

            this.formControlNameDescription.setValue("");
            this.formControlYear.setValue("");
            this.formControlTechnology.setValue("");
            this.formControlMentoring.setValue(false);
        }
    }
// Dane testowe:
const ELEMENT_DATA: Project[] = [
    {
        id: 1,
        name: 'Sklep sportowy',
        mentoring: true,
        curator: 'Anna Wyborna',
        technologies: ['Angular6', 'Laravel'],
        description: 'Aplikacja sklep sportowy do przeglądanie i kupowania produktów sportowych.',
        contestants: 'Jan Kowalski, Marcin Nowak',
        year: 2018
    },
    {
        id: 2,
        name: 'Aplikacja do biegania',
        mentoring: false,
        curator: 'Marian Piotrowski',
        technologies: ['Android'],
        description: 'Aplikacja mobilna pozwalająca użytkownikowi mierzyć i zapisywać czasy i odległości swoich biegów',
        contestants: 'Anna Szymańska, Dorota Cieślak',
        year: 2017
    },
    {
        id: 3,
        name: 'Sklep',
        mentoring: true,
        curator: 'Marian Piotrowski',
        technologies: ['Android'],
        description: 'aplikacja do zarzadzania sklepem',
        contestants: 'studenci',
        year: 2018
    },
    {
        id: 4,
        name: 'Aplikacja',
        mentoring: false,
        curator: 'Anna Wyborna',
        technologies: ['Laravel'],
        description: 'aplikacja do zarzadzania sklepem',
        contestants: 'studenci',
        year: 2017
    },
    {
        id: 5,
        name: 'test1',
        mentoring: true,
        curator: 'test1',
        technologies: ['Java'],
        description: 'test1',
        contestants: 'test1',
        year: 2016
    },
    {
        id: 6,
        name: 'test2',
        mentoring: true,
        curator: 'test2',
        technologies: ['Java Spring'],
        description: 'test2',
        contestants: 'test2',
        year: 2016
    },
    {
        id: 7,
        name: 'test3',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 8,
        name: 'test4',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 9,
        name: 'test5',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 10,
        name: 'test6',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 11,
        name: 'test7',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 12,
        name: 'test8',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
    {
        id: 13,
        name: 'test9',
        mentoring: false,
        curator: 'test3',
        technologies: ['Java Spring'],
        description: 'test3',
        contestants: 'test3',
        year: 2017
    },
];

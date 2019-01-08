import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Project} from '../../project';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ProjectService} from "../../services/project.service";
import {forEach} from "@angular/router/src/utils/collection";

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

    dataSource;
    columnsToDisplay;
    expandedElement: Project;

    filteredValues = {
        name: "",
        description: "",
        year: "",
        technology: "",
        mentoring: "",
        featured: ""
    };

    year;
    formControlTechnology = new FormControl();
    formControlNameDescription = new FormControl();
    formControlMentoring = new FormControl();
    formControlFeatured = new FormControl();

    allYears;
    allTechnologies;
    filteredOptionsTechnology: Observable<string[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    loaded = false;

    constructor(private project: ProjectService) {}

        ngOnInit() {
            this.project.getAcademicYears().subscribe((data) => {
                this.allYears = data;
                this.year = data[0]['id'];
                this.getProjectList(this.year);
            });

            this.project.getLanguages().subscribe((data) => {
                this.allTechnologies = data;
            })

        }

        getProjectList(year) {
            this.loaded = false;
            this.project.getList(year).subscribe((data) => {
                this.loaded = true;
                this.dataSource = new MatTableDataSource(data['data']);
                this.columnsToDisplay = data['columns'];

                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = this.customFilterPredicate();

                this.dataSource.filter = JSON.stringify(this.filteredValues);

                this.filteredOptionsTechnology = this.formControlTechnology.valueChanges.pipe(
                    startWith(''),
                    map(value => this._filterTechnology(value))
                );

            });
        }

        changeYear() {
            this.getProjectList(this.year);
        }

        private customFilterPredicate() {
            const myFilterPredicate = (data, filter: string): boolean => {
                let searchString = JSON.parse(filter);
                return (data.nazwa.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 ||
                    data.description.toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1)
                    && data.technologie.toString().trim().toLowerCase().indexOf(searchString.technology.toLowerCase()) !== -1
                    && data.mentoring.toString().trim().toLowerCase().indexOf(searchString.mentoring.toLowerCase()) !== -1
                    && data.featured.toString().trim().toLowerCase().indexOf(searchString.featured.toLowerCase()) !== -1;
            };
            return myFilterPredicate;
        }

        private _filterTechnology(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.allTechnologies.filter(option => option.toLowerCase().includes(filterValue));
        }

        applyFilterNameDescription(filterValue: string) {
            this.filteredValues['name'] = filterValue.trim().toLowerCase();
            this.filteredValues['description'] = filterValue.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterTechnology(filterValue: string) {
            this.filteredValues['technology'] = filterValue.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterMentoring(isChecked) {
            if(isChecked === false) {
                this.filteredValues['mentoring'] = "";
            }
            else {
                this.filteredValues['mentoring'] = "1";
            }
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        applyFilterFeatured(isChecked) {
            if(isChecked === false) {
                this.filteredValues['featured'] = "";
            }
            else {
                this.filteredValues['featured'] = "1";
            }
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        clearNameDescription() {
            this.filteredValues.name = "";
            this.filteredValues.description = "";
            this.formControlNameDescription.setValue("");
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

        clearTechnology() {
            this.filteredValues.technology = "";
            this.formControlTechnology.setValue("");
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        }

    }


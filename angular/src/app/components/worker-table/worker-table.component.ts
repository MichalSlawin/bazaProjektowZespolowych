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
    selector: 'app-worker-table',
    templateUrl: './worker-table.component.html',
    styleUrls: ['./worker-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class WorkerTableComponent implements OnInit {

    dataSource;
    columnsToDisplay;
    expandedElement: Project;

    filteredValues = {
        name: "",
        description: "",
        indeksNr: "",
        status: "",
        mentoring: ""
    };

    status;
    formControlNameDescription = new FormControl();
    formControlIndeksNr = new FormControl();
    formControlMentoring = new FormControl();

    allStatuses;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private project: ProjectService) {}

    ngOnInit() {
        this.project.getStatuses().subscribe((data) => {
            this.allStatuses = data;
            this.status = data[0]['id'];
            this.filteredValues.status = data[0]['id'];
            this.getProjectList();
        });
    }

    getProjectList() {
        this.project.getWorker().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data['data']);
            this.columnsToDisplay = data['columns'];
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.customFilterPredicate();
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });
    }

    private customFilterPredicate() {
        const myFilterPredicate = (data, filter: string): boolean => {
            let searchString = JSON.parse(filter);

            return (data.nazwa.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 ||
                data.description.toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1)
                && data.students.map(student => student.index_no)
                    .toString().trim().toLowerCase().indexOf(searchString.indeksNr.toLowerCase()) !== -1
                && data.status['id']
                    .toString().trim().toLowerCase().indexOf(searchString.status) !== -1
                && data.mentoring.toString().trim().toLowerCase().indexOf(searchString.mentoring.toLowerCase()) !== -1;
        };
        return myFilterPredicate;
    }


    applyFilterNameDescription(filterValue: string) {
        this.filteredValues['name'] = filterValue.trim().toLowerCase();
        this.filteredValues['description'] = filterValue.trim().toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    }

    applyFilterIndeksNr(filterValue: string) {
        this.filteredValues['indeksNr'] = filterValue.trim().toLowerCase();
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

    applyFilterStatus(filterValue: string) {
        this.filteredValues['status'] = filterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    }

    clearNameDescription() {
        this.filteredValues.name = "";
        this.filteredValues.description = "";
        this.formControlNameDescription.setValue("");
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    }

    clearIndeksNr() {
        this.filteredValues.indeksNr = "";
        this.formControlIndeksNr.setValue("");
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    }
}



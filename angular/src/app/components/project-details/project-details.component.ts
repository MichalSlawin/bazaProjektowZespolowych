import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewMessageComponent} from "../new-message/new-message.component";
import {MatDialog} from "@angular/material";
import {ProjectManagementComponent} from "../project-management/project-management.component";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

    @Input('projectData') projectData;

    @Output() messageEvent = new EventEmitter();

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    refreshData() {
        this.messageEvent.emit(true);
    }

    changeStatus() {
        const dialogRef = this.dialog.open(ProjectManagementComponent, {
            width: '800px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });
    }
}

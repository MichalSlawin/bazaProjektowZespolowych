import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

    @Input('projectData') projectData;

    @Output() messageEvent = new EventEmitter();

    company;

    constructor(private project: ProjectService) { }

    ngOnInit() {}

    refreshData() {
        this.messageEvent.emit(true);
    }

    setCompany() {
        this.project.setCompany(this.company, this.projectData.id).subscribe((data) => {
            this.refreshData();
        });
    }

    deleteCompany() {
        this.project.deleteCompany(this.projectData.id).subscribe((data) => {
            this.refreshData();
        });
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

    @Input('projectData') projectData;

    @Output() messageEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    refreshData() {
        this.messageEvent.emit(true);
    }
}

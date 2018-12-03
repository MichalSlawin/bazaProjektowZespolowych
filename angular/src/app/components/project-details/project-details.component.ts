import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

    @Input('projectData') projectData;

    constructor() { }

    ngOnInit() {
    }

}

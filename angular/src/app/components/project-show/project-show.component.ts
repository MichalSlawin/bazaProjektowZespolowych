import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss']
})
export class ProjectShowComponent implements OnInit {

  id;
  projectData;

  constructor(private project: ProjectService, public route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.getProjectData(this.id);
      });
  }

    refresh(value) {
        if(value) {
            this.getProjectData(this.id);
        }
    }

  getProjectData(id) {
    this.project.getById(id).subscribe((data) => {
        this.projectData = data;
    });
  }

}

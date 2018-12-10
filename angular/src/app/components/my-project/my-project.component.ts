import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent implements OnInit {

  projectData;
  showProject = false;

  constructor(private project: ProjectService) { }

  ngOnInit() {
    this.getProjectData();
  }

  refresh(value) {
    if(value) {
      this.getProjectData();
    }
  }

  getProjectData() {
    this.project.getMine().subscribe((data) => {
      this.projectData = data;
      this.showProject = true;
    }, error => {
      this.projectData = {
        body: 'Nie jesteś przypisany/a do żadnego projektu.'
      };
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent implements OnInit {

  projectData;

  constructor(private project: ProjectService) { }

  ngOnInit() {
    this.getProjectData();
  }

  getProjectData() {
    this.project.getMine().subscribe((data) => {
      this.projectData = data;
    });
  }

}

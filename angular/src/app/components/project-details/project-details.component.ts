import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectData = {
      name: 'Projekt zespołowy',
      description: 'To jest krótki opis\ntego projektu.',
      link: 'https://github.com',
      languages: ['Angular 6', 'Java EE'],
      mentoring: false,
      curator: 'Osoba 2'
  };

  constructor() { }

  ngOnInit() {
  }

}

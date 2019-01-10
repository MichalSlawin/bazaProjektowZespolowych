import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {

  allTechnologies;
  index = 0;
  dataSource;
  displayedColumns: string[] = ['name', 'count', 'action'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private project: ProjectService) { }

  ngOnInit() {
      this.project.getCountedLanguages().subscribe((data) => {
          this.allTechnologies = data;
          this.dataSource = new MatTableDataSource(data['languages']);
          this.dataSource.sort = this.sort;
      });
  }

  delete(name) {
      this.project.deleteTechnology(name).subscribe((data) => {
          window.location.reload();
      });
  }

}

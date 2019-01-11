import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {MatDialog, MatDialogRef, MatSort, MatTableDataSource} from "@angular/material";
import {ConfirmDeletionComponent} from "../confirm-deletion/confirm-deletion.component";

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

  confirmDeletionDialogRef: MatDialogRef<ConfirmDeletionComponent>;

  loaded = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private project: ProjectService, public dialog: MatDialog) { }

  ngOnInit() {
      this.refresh();
  }

  refresh() {
      this.loaded = false;
      this.project.getCountedLanguages().subscribe((data) => {
          this.loaded = true;
          this.allTechnologies = data;
          this.dataSource = new MatTableDataSource(data['languages']);
          this.dataSource.sort = this.sort;
      });
  }

  delete(name) {
      this.confirmDeletionDialogRef = this.dialog.open(ConfirmDeletionComponent, {
          width: '420px',
          data: 'Czy na pewno chcesz usunąć język?',
      });
      this.confirmDeletionDialogRef.afterClosed().subscribe(isConfirmed => {
          if (isConfirmed) {
              this.project.deleteTechnology(name).subscribe((data) => {
                  this.refresh();
              });
          }
      });
  }

}

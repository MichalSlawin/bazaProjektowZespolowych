import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {CheckPasswordComponent} from "../check-password/check-password.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {ConfirmDeletionComponent} from "../confirm-deletion/confirm-deletion.component";

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent implements OnInit {

  projectData;
  showProject = false;

    confirmDeletionDialogRef: MatDialogRef<ConfirmDeletionComponent>;

  constructor(private project: ProjectService, public dialog: MatDialog) { }

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

  delete() {
      this.confirmDeletionDialogRef = this.dialog.open(ConfirmDeletionComponent, {
          width: '420px',
      });
      this.confirmDeletionDialogRef.afterClosed().subscribe(isConfirmed => {
          if (isConfirmed) {
              this.project.delete().subscribe((data) => {
                  console.log(data);
              });
          }
      });
  }

}

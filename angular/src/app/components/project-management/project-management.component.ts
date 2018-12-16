import {Component, Inject, OnInit} from '@angular/core';
import {CheckPasswordComponent} from '../check-password/check-password.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProjectService} from '../../services/project.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

    formControlComment = new FormControl();
    status;

    data = {
        id: '',
        status: '',
        comment: ''
    };
    checkPasswordDialogRef: MatDialogRef<CheckPasswordComponent>;

    allStatuses;

  constructor(public dialogRef: MatDialogRef<ProjectManagementComponent>,
              @Inject(MAT_DIALOG_DATA) public id: any,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private project: ProjectService) { }

  ngOnInit() {
      this.project.getStatuses().subscribe((data) => {
          this.allStatuses = data;
      });
  }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Zamknij', {
            duration: 2000,
        });
    }

    close() {
        this.dialogRef.close();
    }

    send() {
        this.data.id = this.id;
        this.data.comment = this.formControlComment.value;
        this.data.status = this.status;

        if (this.data.status == null || this.data.status === '') {
            this.openSnackBar('Wybierz status');
        } else {
            // this.checkPassword();
            console.log(this.data);
            this.dialogRef.close();
        }
    }

    // checkPassword() {
    //     this.checkPasswordDialogRef = this.dialog.open(CheckPasswordComponent, {
    //         width: '600px',
    //         data: this.data
    //     });
    //
    //     this.checkPasswordDialogRef.afterClosed().subscribe(isPasswordCorrect => {
    //         if (isPasswordCorrect) {
    //             this.dialogRef.close();
    //             this.openSnackBar('Wiadomość wysłana');
    //         } else {
    //             this.openSnackBar('Nieprawidłowe hasło');
    //         }
    //     });
    // }

}

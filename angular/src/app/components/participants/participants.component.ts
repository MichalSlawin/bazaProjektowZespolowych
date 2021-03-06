import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {ProjectStudentsService} from "../../services/project-students.service";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {isUndefined} from "util";
import {ConfirmDeletionComponent} from "../confirm-deletion/confirm-deletion.component";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  @Input('project_id') project_id;
  @Input('students') students;
  @Input('status') status;
  @Input('is_owner') is_owner;
  @Input('is_worker') is_worker;
  @Input('does_belong') does_belong;

  @Output() messageEvent = new EventEmitter();


  userRole;
  maxAccepted = 4;
  confirmDeletionDialogRef: MatDialogRef<ConfirmDeletionComponent>;
  constructor(private projectStudent: ProjectStudentsService, private dialog: MatDialog) { }

  ngOnInit() {
      this.userRole = localStorage.getItem('role');
  }

    countStudents() {
      let acceptedCount = 0;
      this.students.forEach((student) => {
          if(student.pivot.accepted == 1) {
              acceptedCount++;
          }
      });
      return acceptedCount;
    }

    refreshParticipants() {
        this.messageEvent.emit(true);
    }

    accept(id) {
      if(this.countStudents() < this.maxAccepted) {
          this.projectStudent.accept(id).subscribe((data) => {
              this.refreshParticipants();
          });
      } else {
           this.dialog.open(ErrorDialogComponent, {
               width: '600px',
               data: 'Do projektu jest już zapisana maksymalna ilość osób'
           });
      }
    }

    throwOut(id) {
        this.projectStudent.throwOut(id).subscribe((data) => {
            this.refreshParticipants();
        });
    }

    throwOutByWorker(id) {
        this.confirmDeletionDialogRef = this.dialog.open(ConfirmDeletionComponent, {
            width: '450px',
            data: 'Czy na pewno chcesz wyrzucić studenta?',
        });
        this.confirmDeletionDialogRef.afterClosed().subscribe(isConfirmed => {
            if (isConfirmed) {
                this.projectStudent.throwOutByWorker(this.project_id, id).subscribe((data) => {
                    this.refreshParticipants();
                });
            }
        });
    }

    restore(id) {
        this.projectStudent.restore(this.project_id, id).subscribe((data) => {
            this.refreshParticipants();
        });
    }

    isUndefined(arg) {
      return isUndefined(arg);
    }

    signIn() {
      this.projectStudent.add(this.project_id).subscribe((data) => {
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
              width: '600px',
              data: 'Zgłoszenie zostało wysłane'
          });
          dialogRef.afterClosed().subscribe((data) => {
              this.refreshParticipants();
          });
      });
    }

    signOut() {
        this.projectStudent.signOut(this.project_id).subscribe((data) => {
            const dialogRef = this.dialog.open(SuccessDialogComponent, {
                width: '600px',
                data: 'Wypisano z projektu'
            });
            dialogRef.afterClosed().subscribe((data) => {
                location.href = ("/projekty");
            });
        });
    }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {ProjectStudentsService} from "../../services/project-students.service";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {isUndefined} from "util";

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

  @Output() messageEvent = new EventEmitter();


  userRole;
  maxAccepted = 4;
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
           })
      }
    }

    throwOut(id) {
        this.projectStudent.throwOut(id).subscribe((data) => {
            this.refreshParticipants();
        });
    }

    throwOutByWorker(id) {
        this.projectStudent.throwOutByWorker(this.project_id, id).subscribe((data) => {
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
      })
    }

}

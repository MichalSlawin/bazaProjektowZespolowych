import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  @Input('students') students;
  @Input('status') status;
  @Input('is_owner') is_owner;

  @Output() messageEvent = new EventEmitter();

  acceptedCount = 0;
  maxAccepted = 4;
  constructor(private project: ProjectService) { }

  ngOnInit() {
  }

    countStudents() {
        this.students.forEach((student) => {
            if(student.pivot.accepted == 1) {
                this.acceptedCount++;
            }
        });
    }

    refreshParticipants() {
        this.messageEvent.emit(true);
    }

    accept(id) {
      this.project.accept(id).subscribe((data) => {
        this.refreshParticipants();
      });
    }

    throwOut(id) {
        this.project.throwOut(id).subscribe((data) => {
            this.refreshParticipants();
        });
    }

}

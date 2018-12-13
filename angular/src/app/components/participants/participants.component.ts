import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  @Input('students') students;
  @Input('status') status;
  @Input('is_owner') is_owner;

  acceptedCount = 0;
  maxAccepted = 4;
  constructor() { }

  ngOnInit() {
    this.students.forEach((student) => {
      if(student.pivot.accepted == 1) {
        this.acceptedCount++;
      }
    });
  }

    accept(id) {
      console.log('Zaakceptuj:' + id);
    }

    throwOut(id) {
      console.log('Wyrzuć:' + id);
    }

}

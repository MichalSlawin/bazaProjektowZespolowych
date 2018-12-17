import {Component, Input, OnInit} from '@angular/core';
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

    @Input('projectStatus') status;
    @Input('projectStudents') students;
    @Input('projectId') id;

    selectedStatus;
    options;
    comment = '';
    required = false;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
      this.statusService.getProject(this.id).subscribe((data) => {
          this.options = data;
          if(this.options.length == 1) {
              this.selectedStatus = this.options[0]['id'];
              this.checkRequired();
          }
      });
  }

    checkRequired() {
      this.required = this.selectedStatus == 4 || this.selectedStatus == 5;
    }

  send() {
      this.statusService.updateProject(this.id, this.selectedStatus, this.comment).subscribe((data) => {
         window.location.reload();
      });
  }
}

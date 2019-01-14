import { Component, OnInit } from '@angular/core';
import {WorkerService} from "../../services/worker.service";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {

  yearList;
  password = '';
  loaded = false;

  constructor(private worker: WorkerService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getList();
  }

  updateList() {
    this.worker.updateWorkerList(this.password).subscribe((data) => {
      this.password = '';
      this.getList();
    }, error1 => {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '600px',
        data: 'Podano złe hasło',
        id: 'infoDialog'
      });
    });
  }

  getList() {
    this.loaded = false;
    this.worker.getAcademicYearsWorkers().subscribe((data) => {
      this.loaded = true;
      this.yearList = data;
    });
  }

}

import { Injectable } from '@angular/core';
import {apiLink} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  getAcademicYearsWorkers() {
    return this.http.get(apiLink + "/academic-year/workers");
  }

  updateWorkerList(data) {
    const uploadData = new FormData();
    uploadData.append('password', data);
    return this.http.post(apiLink + '/worker/current', uploadData);
  }

  addAcademicYear() {
    return this.http.post(apiLink + '/academic-year', null);
  }
}

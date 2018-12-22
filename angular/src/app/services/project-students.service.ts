import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectStudentsService {

  constructor(private http: HttpClient) { }

    add(id) {
      return this.http.post(apiLink + '/project/' + id + '/students', '');
    }

    accept(id) {
        const uploadData = new FormData();
        uploadData.append("_method", "PUT");
        return this.http.post(apiLink + '/project/mine/students/' + id, uploadData);
    }

    throwOut(id) {
        const uploadData = new FormData();
        uploadData.append("_method", "DELETE");
        return this.http.post(apiLink + '/project/mine/students/' + id, uploadData);
    }

    throwOutByWorker(projectId, studentId) {
        const uploadData = new FormData();
        uploadData.append("_method", "DELETE");
        return this.http.post(apiLink + '/project/' + projectId + '/students/' + studentId, uploadData);
    }
}

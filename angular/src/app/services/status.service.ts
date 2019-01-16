import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  get() {
      return this.http.get(apiLink + '/status');
  }

    getProject(id) {
        return this.http.get(apiLink + '/project/' + id + '/status');
    }

    updateProject(id, status, comment, password) {
        const uploadData = new FormData();
        uploadData.append('status', status);
        uploadData.append('comment', comment);
        uploadData.append('password', password);
      return this.http.post(apiLink + '/project/' + id + '/status', uploadData);
    }
}

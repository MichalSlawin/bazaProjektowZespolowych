import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get(apiLink + "/programing-language");
  }

  getAcademicYears() {
    return this.http.get(apiLink + "/academic-year");
  }

  // getStatuses() {
  //   return this.http.get(apiLink + "/status");
  // }

  add(data) {
    const uploadData = new FormData();
    uploadData.append('name', data['name']);
    uploadData.append('description', data['description']);
    uploadData.append('link', data['link']);
    for(let language of data['languages']) {
      uploadData.append('languages[]', language);
    }
    uploadData.append('mentoring', data['mentoring'] ? '1' : '0');
    uploadData.append('worker', data['curator']);
    return this.http.post(apiLink + '/project', uploadData);
  }

  getList(year?: string) {
    let params = new HttpParams().set('rok', year);

    return this.http.get(apiLink + "/project", { params: params });
  }

  getMine() {
    return this.http.get(apiLink + '/project/mine');
  }
}

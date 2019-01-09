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

  getById(id) {
    return this.http.get(apiLink + '/project/' + id);
  }

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

  edit(data) {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
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

  getWorker(year?: string) {
      let params = new HttpParams().set('rok', year);
    return this.http.get(apiLink + '/project/worker', { params: params })
  }

  delete() {
    const uploadData = new FormData();
    uploadData.append("_method", "DELETE");
    return this.http.post(apiLink + '/project', uploadData);
  }

  requestEdition() {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
      return this.http.post(apiLink + '/project/requestEdition', uploadData);
  }

  feature(id) {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
      uploadData.append("id", id);
      return this.http.post(apiLink + '/project/feature', uploadData);
  }

  cancelFeature(id) {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
      uploadData.append("id", id);
      return this.http.post(apiLink + '/project/cancelFeature', uploadData);
  }

  setCompany(company, id) {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
      uploadData.append("company", company);
      uploadData.append("id", id);
      return this.http.post(apiLink + '/project/setCompany', uploadData);
  }

  deleteCompany(id) {
      const uploadData = new FormData();
      uploadData.append("_method", "PUT");
      uploadData.append("id", id);
      return this.http.post(apiLink + '/project/deleteCompany', uploadData);
  }

}

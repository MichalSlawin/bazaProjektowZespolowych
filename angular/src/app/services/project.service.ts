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

  getList(year?: string) {
    let params = new HttpParams().set('rok', year);

    return this.http.get(apiLink + "/project", { params: params });
  }
}

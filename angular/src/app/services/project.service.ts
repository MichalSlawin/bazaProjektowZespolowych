import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get(apiLink + "/programing-language");
  }
}

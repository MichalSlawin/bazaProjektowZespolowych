import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data) {
      const uploadData = new FormData();
      uploadData.append('username', data['username']);
      uploadData.append('password', data['password']);
      return this.http.post(apiLink + '/login', uploadData);
  }
}

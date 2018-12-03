import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiLink} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(data) {
      const uploadData = new FormData();
      uploadData.append('project_id', '6');
      uploadData.append('body', data['body']);
      uploadData.append('subject', data['subject']);
      uploadData.append('password', data['password']);
      uploadData.append('is_public', data['is_public'] ? '1' : '0');
      return this.http.post(apiLink + '/mail', uploadData);
  }
}

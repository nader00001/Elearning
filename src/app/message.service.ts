import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../app/models/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

 
  private baseUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) { }

  saveMessage(message: Message): Observable<any> {
    return this.http.post(this.baseUrl, message);
  }

  getMessagesByGroupId(groupId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${groupId}`);
  }
}

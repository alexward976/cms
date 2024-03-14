import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { max } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageListChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.http
      .get('https://awcms-8ac6f-default-rtdb.firebaseio.com/messages.json')
      .subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();

          this.messageListChangedEvent.next(this.messages.slice());
        },
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let message of this.messages) {
      let currentId: number = +message.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    let messagesString = JSON.stringify(this.messages);
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json;');
    this.http
      .put(
        'https://awcms-8ac6f-default-rtdb.firebaseio.com/messages.json',
        messagesString,
        {
          headers,
        }
      )
      .subscribe({
        next: () => {
          this.messageListChangedEvent.next(this.messages.slice());
        },
      });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }

    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
}

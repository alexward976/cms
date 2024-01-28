import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Sample Subject', 'Lorem ipsum solor dolet', 'Alex Ward'),
    new Message(2, 'Subject Sample', 'Dolet solor ipsum lorem', 'Ward Alex'),
    new Message(3, 'Sample sample', 'This is the true sample', 'Mr. Man'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

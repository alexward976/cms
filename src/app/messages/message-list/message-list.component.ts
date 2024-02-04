import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Sample Subject', 'Lorem ipsum solor dolet', 'Person 1'),
    new Message(2, 'Subject Sample', 'Dolet solor ipsum lorem', 'Person 2'),
    new Message(
      3,
      'Sample sample',
      'Even more sample message text',
      'Person 3'
    ),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

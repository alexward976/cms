import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild('subject', { static: false }) subject: ElementRef;
  @ViewChild('msgText', { static: false }) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = '1';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTxtValue = this.msgText.nativeElement.value;

    const newMessage = new Message(
      '',
      subjectValue,
      msgTxtValue,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}

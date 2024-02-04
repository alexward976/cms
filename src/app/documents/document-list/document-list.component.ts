import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents = [
    new Document(1, 'Doc1', 'First Document', 'url/1/test', []),
    new Document(2, 'Doc2', 'Second Document', 'url/2/test', []),
    new Document(3, 'Doc3', 'Third Document', 'url/3/test', []),
    new Document(4, 'Doc4', 'Fourth Document', 'url/4/test', []),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}

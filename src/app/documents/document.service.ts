import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocId: number;

  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let document of this.documents) {
      let currentId: number = +document.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }

    return null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument || newDocument == null) {
      return;
    }

    this.maxDocId++;
    newDocument.id = this.maxDocId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      !originalDocument ||
      originalDocument == null ||
      !newDocument ||
      newDocument == null
    ) {
      return;
    }

    let pos: number = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocId: number;

  documents: Document[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get('https://awcms-8ac6f-default-rtdb.firebaseio.com/documents.json')
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocId = this.getMaxId();
          this.documents.sort((a: Document, b: Document) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });

          this.documentListChangedEvent.next(this.documents.slice());
        },

        error: (error: any) => {
          console.log(error);
        },
      });
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

  storeDocuments() {
    let documentsString = JSON.stringify(this.documents);
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json;');
    this.http
      .put(
        'https://awcms-8ac6f-default-rtdb.firebaseio.com/documents.json',
        documentsString,
        {
          headers,
        }
      )
      .subscribe({
        next: () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
      });
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}

import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.http
      .get('https://awcms-8ac6f-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();

          this.contactListChangedEvent.next(this.contacts.slice());
        },
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let contact of this.contacts) {
      let currentId: number = +contact.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeContacts() {
    let contactsString = JSON.stringify(this.contacts);
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json;');
    this.http
      .put(
        'https://awcms-8ac6f-default-rtdb.firebaseio.com/contacts.json',
        contactsString,
        {
          headers,
        }
      )
      .subscribe({
        next: () => {
          {
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        },
      });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (!newContact || newContact == null) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (
      !originalContact ||
      originalContact == null ||
      !newContact ||
      newContact == null
    ) {
      return;
    }

    let pos: number = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}

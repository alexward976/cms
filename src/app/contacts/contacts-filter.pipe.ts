import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];

    for (let contact of contacts) {
      if (term && term.length > 0) {
        if (
          contact.name.toLowerCase().includes(term.toString().toLowerCase())
        ) {
          filteredContacts.push(contact);
        }
      }
    }

    if (filteredContacts.length < 1) {
      return contacts;
    }

    return filteredContacts;
  }
}

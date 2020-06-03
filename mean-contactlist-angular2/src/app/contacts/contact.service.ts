import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = 'api/contacts';

  constructor(private http: HttpClient) { }
  
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.contactsUrl)
      .toPromise()
      .then(response => response as Contact[])
      .catch(this.handleError);
  }

  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + delContactId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  updateContact(putContact: Contact): Promise<void | Contact> {
    const putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText} ` : 'Server error';
    console.log(errMsg);
  }

}

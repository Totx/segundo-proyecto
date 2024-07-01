import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactoModel } from '../models/contacto.model';
@Injectable({
  providedIn: 'root',
})
export abstract class ContactoServiceInterface {
  abstract getContactos(): Observable<ContactoModel[]>;

  abstract addContacto(contacto: ContactoModel): Observable<any>;

  abstract deleteContacto(id: number): Observable<any>;
  abstract updateContacto(id: number, contacto: ContactoModel): Observable<any>;
}

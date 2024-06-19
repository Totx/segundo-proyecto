
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactoModel } from '../models/contacto.model';

export abstract class ContactoServiceInterface {

    abstract getContactos(): Observable<ContactoModel[]>;

    abstract addContacto(contacto: ContactoModel): Observable<any>;

    abstract deleteContacto(contacto: ContactoModel): Observable<any>;

}

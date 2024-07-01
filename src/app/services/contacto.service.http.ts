import { Injectable } from '@angular/core';
import { ContactoServiceInterface } from './contacto.service.interface';
import { Observable } from 'rxjs';
import { ContactoModel } from '../models/contacto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactoServiceHttp extends ContactoServiceInterface {
  private url: string = 'http://localhost:3000/contactos';

  constructor(private http: HttpClient) {
    super();
  }

  override getContactos(): Observable<ContactoModel[]> {
    return this.http.get<ContactoModel[]>(this.url);
  }
  override addContacto(contacto: ContactoModel): Observable<any> {
    return this.http.post(this.url, contacto);
  }
  override deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  override updateContacto(
    id: number,
    contacto: ContactoModel
  ): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, contacto);
  }
}

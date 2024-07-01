import { Injectable } from '@angular/core';
import { ContactoModel } from '../models/contacto.model';
import { GeneroModel } from '../models/genero.model';
import { Observable, of } from 'rxjs';
import { ContactoServiceInterface } from './contacto.service.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactoService extends ContactoServiceInterface {
  private contacts: ContactoModel[] = [
    {
      id: 1,
      nombre: 'John Doe',
      genero: GeneroModel.Masculino,
      fechaNacimiento: new Date(1990, 5, 21),
      documento: 12345678,
    },
    {
      id: 2,
      nombre: 'Jane Smith',
      genero: GeneroModel.Femenino,
      fechaNacimiento: new Date(1985, 11, 15),
      documento: 98765432,
    },
    {
      id: 3,
      nombre: 'Jane Doe',
      genero: GeneroModel.Masculino,
      fechaNacimiento: new Date(1990, 1, 1),
      documento: 12345678,
    },
    {
      id: 4,
      nombre: 'Bob Johnson',
      genero: GeneroModel.Masculino,
      fechaNacimiento: new Date(1995, 3, 10),
      documento: 87654321,
    },
  ];

  constructor() {
    super();
  }

  override getContactos(): Observable<ContactoModel[]> {
    return of(this.contacts);
  }

  override addContacto(contacto: ContactoModel): Observable<any> {
    contacto.id = Math.max(...this.contacts.map((contacto) => contacto.id)) + 1;
    this.contacts.push(contacto);
    return of('Contacto Agregado');
  }

  override deleteContacto(id: number): Observable<any> {
    // This method filters the contacts array to remove the contact object passed as a parameter
    // It creates a new array with all contacts except the one being deleted
    // Then it returns an observable with the string "Contacto Eliminado"
    this.contacts = this.contacts.filter(
      (contactoVal) => id !== contactoVal.id
    );
    return of('Contacto Eliminado');
  }
  override updateContacto(
    id: number,
    contacto: ContactoModel
  ): Observable<any> {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.contacts[index] = contacto;
    }
    return of(contacto);
  }
}

import { Injectable } from '@angular/core';
import { ContactoModel } from '../models/contacto.model';
import { GeneroModel } from '../models/genero.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {

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

  constructor() {}

  getContactos(): Observable<ContactoModel[]> {
    return of(this.contacts);
  }

  addContacto(contacto: ContactoModel): Observable<any> {
    contacto.id = Math.max(...this.contacts.map((contacto) => contacto.id)) + 1;
    this.contacts.push(contacto);
    return of("Contacto Agregado");
  }

  deleteContacto(contacto: ContactoModel): Observable<any> {
    // This method filters the contacts array to remove the contact object passed as a parameter
    // It creates a new array with all contacts except the one being deleted
    // Then it returns an observable with the string "Contacto Eliminado"
    this.contacts = this.contacts.filter(
      (contactoVal) => contacto.id !== contactoVal.id
    );
    return of('Contacto Eliminado');
  }

}

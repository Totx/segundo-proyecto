import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactoModel } from '../../models/contacto.model';
import { CommonModule } from '@angular/common';
import { ContactoServiceInterface } from '../../services/contacto.service.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  contacts: ContactoModel[] = [];

  constructor(private contactoService: ContactoServiceInterface) {
    this.contactoService.getContactos().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactoService.getContactos().subscribe({
      next: (contacto: ContactoModel[]) => {
        this.contacts = contacto;
      },
    });
  }

  deleteContact(contacto: ContactoModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${contacto.nombre} with id ${contacto.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactoService.deleteContacto(contacto.id).subscribe({
          next: () => {
            this.loadContacts();
          },
        });
        Swal.fire(
          'Deleted!',
          `${contacto.nombre} with id ${contacto.id} has been deleted.`,
          'success'
        );
      }
    });
  }
}

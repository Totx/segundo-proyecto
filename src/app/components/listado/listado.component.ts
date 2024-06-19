import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactoService } from '../../services/contacto.service';
import { ContactoModel } from '../../models/contacto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  contacts: ContactoModel[] = [];

  constructor(private contactoService: ContactoService) {
    this.contactoService.getContactos().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactoService.getContactos().subscribe({
      next: (lista: ContactoModel[]) => {
        this.contacts = lista;
      },
    });
  }

  deleteContact(contacto: ContactoModel) {
    this.contactoService.deleteContacto(contacto).subscribe({
      next: () => {
        this.loadContacts();
      },
    });
  }
}


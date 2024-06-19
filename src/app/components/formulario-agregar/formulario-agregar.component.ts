import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactoModel } from '../../models/contacto.model';
import { GeneroModel } from '../../models/genero.model';
import { PropNames, objectProps } from '../../utils/strong-type-props';
import Swal from 'sweetalert2';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-formulario-agregar',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-agregar.component.html',
  styleUrl: './formulario-agregar.component.css',
})
export class FormularioAgregarComponent {
  contactoForm: FormGroup = new FormGroup({});

  campos: PropNames<ContactoModel>;

  generos: GeneroModel[] = Object.values(GeneroModel);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.contactoForm = this.fb.group({
      documento: [
        '',
        [Validators.required, Validators.min(10000), Validators.max(30000)],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      fechaNacimiento: ['', [Validators.required]],
      genero: [
        '',
        [
          Validators.required,
          Validators.pattern(Object.values(GeneroModel).join('|')),
        ],
      ],
    });

    this.campos = objectProps(this.contactoForm.value);
  }

  changeData() {
    this.contactoForm.patchValue({
      documento: Math.floor(Math.random() * 1000000),
      nombre: 'Random Name ' + Math.floor(Math.random() * 100),
      fechaNacimiento: new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ),
      genero: this.generos[Math.floor(Math.random() * this.generos.length)],
    });
  }

  goBack() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      let contacto = this.contactoForm.value;
      this.contactoService.addContacto(contacto).subscribe({
        next: () => {
          Swal.fire({
            title: 'Contacto agregado',
            text: 'El contacto se agregó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
        complete: () => {
          this.contactoForm.reset();
        },
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El formulario no es válido',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}

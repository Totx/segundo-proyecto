import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-editar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './formulario-editar.component.html',
  styleUrl: './formulario-editar.component.css'
})
export class FormularioEditarComponent {

  id:number = 0;

  constructor(private router:Router, private rutaActual:ActivatedRoute) {
    this.id = this.rutaActual.snapshot.params['id'];
    //Otra Manera de obtener el id de la ruta
  //   this.rutaActual.params.subscribe(params => {
  //     this.id = params["id"];
  //  });
  }

  goBack() {
    this.router.navigate(['']);
  }
}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'segundo-proyecto';

  constructor(private http: HttpClient) {}

  probarGet() {
    this.http.get('http://localhost:3000/contactos').subscribe((data) => {
      Swal.fire({
        icon: 'info',
        title: 'Response Data',
        text: JSON.stringify(data)
      });
      console.log(data);
    });
  }
}

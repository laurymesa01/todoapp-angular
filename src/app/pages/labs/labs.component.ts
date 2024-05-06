import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  tasks = [
    'Estudiar para el examen teorico de la licencia',
    'Crear portfolio',
    'Empezar a trabajar',
    'Ahorrar dinero',
    'Comprarme un carro'
  ]
}

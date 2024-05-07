import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal([
    'Estudiar para el examen teorico de la licencia',
    'Crear portfolio',
    'Empezar a trabajar',
    'Ahorrar dinero',
    'Comprarme un carro'
  ]);

  createNewTodo(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update(tasks => [... tasks, newTask])
  }

  deleteTask(i: number){
    this.tasks.update(tasks => tasks.filter((task, index) => index !== i))
  }
}

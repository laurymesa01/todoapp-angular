import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Estudiar para el examen teorico de la licencia',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear portfolio',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Empezar a trabajar',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Comprarme un carro',
      completed: false
    },
  ]);

  createNewTodo(event: Event){
    const input = event.target as HTMLInputElement;
    const title = input.value;
    this.addTask(title);
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    }
    this.tasks.update(tasks => [... tasks, newTask])
  }

  deleteTask(i: number){
    this.tasks.update(tasks => tasks.filter((task, index) => index !== i))
  }

  updateTask(index: number){
    // const index = this.tasks().findIndex(task => task.title === title)
    // this.tasks()[index].completed = !this.tasks()[index].completed;
    this.tasks.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  // StyleCompletedTask(){
  //   let style = {
  //     'text-decoration': 'line-through'
  //   }
  //   return style;
  // }
}

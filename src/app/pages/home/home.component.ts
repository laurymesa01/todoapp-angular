import { Component, computed, signal } from '@angular/core';
import { Filters, Task } from '../../models/task.model';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  Filters = Filters;
  filter = signal<Filters>(Filters.All);

  tasksByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.tasks()
    const filterMap: Record<Filters, () => Task[]> = {
      [Filters.Completed]: () => tasks.filter(task => task.completed),
      [Filters.Pending]: () => tasks.filter(task => !task.completed),
      [Filters.All]: () => tasks,
    }

    return filterMap[filter]();
    // if(filter === 'pending'){
    //   return tasks.filter(task => !task.completed)
    // }
    // if(filter === 'completed'){
    //   return tasks.filter(task => task.completed)
    // }
    // return tasks
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$')
    ]
  })

  createNewTodo(){
    if(this.newTaskCtrl.valid){
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue('')
    }
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
    });
  }

  updateTaskEditingMode(index: number){
    this.tasks.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index && !task.completed) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    const newTitle = input.value;
    this.tasks.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: newTitle,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: Filters){
    this.filter.set(filter)
  }

}

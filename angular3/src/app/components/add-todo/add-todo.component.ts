import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todo: Todo = {
    title: '',
    description: ''

  };
  submitted = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  saveTodo(): void {
    const data = {
      title: this.todo.title,
      description: this.todo.description
    };

    this.todoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }


  newTodo(): void {
    this.submitted = false;
    this.todo = {
      title: '',
      description: ''

    };
  }

}

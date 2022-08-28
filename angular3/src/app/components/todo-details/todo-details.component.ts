import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTodo: Todo = {
    title: '',
    description: '',
  };

  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTodo(this.route.snapshot.params['id']);
    }
  }

  //get Todo with given id
  getTodo(id: string): void {
    this.todoService.get(id).subscribe({
      next: (data) => {
        this.currentTodo = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  // Update Todo
  updateTodo(): void {
    this.message = '';
    this.todoService.update(this.currentTodo.id, this.currentTodo).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This ToDo was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  // Delete Todo with given id
  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/todos']);
      },
      error: (e) => console.error(e),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { Todo } from 'src/app/Models/Todo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private _category: CategoryService,
    private _auth: AuthenticationService, 
    private _todo: TodoService,
    private _router : Router) { }

  todo: Todo = new Todo();
  message = '';
  errors: string[] = [];
  categoriesByUser: Category[] = [];
  ngOnInit(): void {

    this._category.findAllByUserId(this._auth.authenticatedUser.id!).subscribe(
      data => {
        this.categoriesByUser = data
      }
    )
  }

  save() {
    this.todo.category.user = this._auth.authenticatedUser;
    this._todo.create(this.todo).subscribe(
      () => {
        this.errors = [];
        this.message = "todo saved successfully";
        this._router.navigate(["todos"])
      },
      errors => {
        this.errors = [];
        this.message = '';
        if (errors.error.errors == null) {
          this.errors.push(errors.error.message)
        } else {
          this.errors = errors.error.errors;
        }
      }
    )
  }

}

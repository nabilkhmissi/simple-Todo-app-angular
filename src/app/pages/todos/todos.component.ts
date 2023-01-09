import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { Todo } from 'src/app/Models/Todo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private _router: Router,
    private _todo: TodoService,
    private _auth: AuthenticationService,
    private _category: CategoryService) { }

  todos: Todo[] = [];
  searchKey = '';
  categories: Category[] = [];
  selectedCategory!: number;
  loading = true;

  ngOnInit(): void {
    this.getAllTodosByUserId();
    this.getAllCategoriesByUser();
  }

  addTodo() {
    this._router.navigate(['home/add-todo'])
  }

  getAllCategoriesByUser() {
    this._category.findAllByUserId(this._auth.authenticatedUser.id!).subscribe(
      data => {
        this.categories = data
      }
    )
  }

  getAllTodosByUserId() {
    this.loading = true;
    this._todo.findAllByUser(this._auth.authenticatedUser.id!).subscribe(
      (res: Todo[]) => {
        this.todos = res
        this.loading = false;
      }
    )
  }

  getTodosByCat() {
    this.loading = true;
    this._todo.findAllByCategory(this.selectedCategory).subscribe(
      (data: Todo[]) => {
        this.todos = data
        this.loading = false;
      }
    )
  }

  todosOfToday() {
    /* this._todo.findAllForTody().subscribe(
      data => {

      }
    ) */
  }

  done(todo: Todo) {
    todo.done = !todo.done;
    this._todo.checkAsDone(todo.id).subscribe(
      () => {

      }
    )
  }

  doLikeTodo(todo: Todo) {
    todo.favorite = !todo.favorite;
    this._todo.changeFavorite(todo.id).subscribe(
      () => {

      }
    )
  }

  deleteTodo(id: number) {
    this._todo.deleteById(id).subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  getFavorite() {
    this.loading = true;
    this._todo.getFavorite(this._auth.authenticatedUser.id!).subscribe(
      (data: Todo[]) => {
        this.todos = data
        this.loading = false;
      }
    )
  }

  doSearch() {
    this.loading = true;
    this._todo.doSearch(this._auth.authenticatedUser.id!, this.searchKey).subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.loading = false;
      }
    )
  }

}

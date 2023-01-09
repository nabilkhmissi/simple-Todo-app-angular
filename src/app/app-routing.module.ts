import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TodosComponent } from './pages/todos/todos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "home", component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: "todos", pathMatch: 'full' },
      { path: "profile/:id", component: ProfileComponent },
      { path: "add-category", component: AddCategoryComponent },
      { path: "todos", component: TodosComponent },
      { path: "add-todo", component: AddTodoComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

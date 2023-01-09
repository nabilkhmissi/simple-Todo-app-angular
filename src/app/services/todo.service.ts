import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { Todo } from '../Models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  create(todo: Todo) {
    return this._http.post<Todo>(config.apiUrl + '/todo/create', todo)
  }

  deleteById(id: number) {
    return this._http.delete(config.apiUrl + `/todo/delete/${id}`)
  }

  findAllByCategory(catId: number) {
    return this._http.get<Todo[]>(config.apiUrl + `/todo/find/category/${catId}`)
  }

  findAllByUser(userId: number) {
    return this._http.get<Todo[]>(config.apiUrl + `/todo/find/user/${userId}`)
  }

  changeFavorite(id: number) {
    return this._http.get(config.apiUrl + `/todo/favorite/${id}`)
  }

  checkAsDone(id: number) {
    return this._http.get(config.apiUrl + `/todo/done/${id}`)
  }

  getFavorite(id: number) {
    return this._http.get<Todo[]>(config.apiUrl + `/todo/user/${id}/favorite/find`)
  }

  doSearch(userId : number,  searchKey: string) {
    return this._http.get<Todo[]>(config.apiUrl + `/todo/user/${userId}/doSearh/${searchKey}`)
  }


}

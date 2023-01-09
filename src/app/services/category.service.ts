import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  create(category: Category) {
    return this._http.post<Category>(config.apiUrl + '/category/create', category)
  }

  deleteById(id: number) {
    return this._http.delete(config.apiUrl + `/category/delete/${id}`)
  }

  findAllByUserId(id: number) {
    return this._http.get<Category[]>(config.apiUrl + `/category/find/user/${id}`)
  }
}

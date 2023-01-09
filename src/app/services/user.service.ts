import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { UserDto } from '../Models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  findById(id: number) {
    return this._http.get<UserDto>(config.apiUrl + `/user/find/${id}`)
  }

  update(user: UserDto) {
    return this._http.put(config.apiUrl + `/user/update/${user.id}`, user)
  }

  delete(id: number) {
    return this._http.delete(config.apiUrl + `/user/delete/${id}`)
  }
}
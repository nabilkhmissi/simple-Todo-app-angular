import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'src/config';
import { AuthRequest } from '../Models/AuthRequest';
import { AuthResponse } from '../Models/AuthResponse';
import { UserDto } from '../Models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticatedUser!: AuthResponse;
  isUserLoggedIn!: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.authenticatedUser = JSON.parse(localStorage.getItem("loggedUser")!);
    this.isUserLoggedIn = this.authenticatedUser ? true : false;
  }

  login(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>("http://localhost:8081/api/login", authRequest);
  }

  signup(userDto: UserDto) {
    return this.http.post<AuthResponse>("http://localhost:8081/api/v1/user/create", userDto);
  }
}

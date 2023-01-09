import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/Models/UserDto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  activeUser!: UserDto;
  constructor(private _auth: AuthenticationService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.activeUser = this._auth.authenticatedUser;
  }

  logout() {
    localStorage.removeItem("loggedUser");
    this._auth.authenticatedUser = JSON.parse(localStorage.getItem("loggedUser")!);
    this._auth.isUserLoggedIn = false;
    this._router.navigate(['login'])
  }

}

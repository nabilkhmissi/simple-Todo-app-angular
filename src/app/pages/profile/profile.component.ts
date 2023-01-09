import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/Models/AuthResponse';
import { UserDto } from 'src/app/Models/UserDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDto = new UserDto();
  message = '';
  errors: string[] = [];

  constructor(private _activeRoute: ActivatedRoute,
    private _user: UserService,
    private _auth: AuthenticationService,
    private _router: Router) { }

  ngOnInit(): void {
    let id = this._activeRoute.snapshot.params?.['id'];
    this._user.findById(id).subscribe(
      data => {
        this.user = data
      }
    )
  }

  update() {
    this._user.update(this.user).subscribe(
      (res: any) => {
        this.errors = [];
        this.message = "infos updated successfully";
        this._auth.authenticatedUser = res
        localStorage.setItem("loggedUser", JSON.stringify(res))
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

  deleteAccount() {
    this._user.delete(this.user.id!).subscribe(
      () => {
        localStorage.removeItem("loggedUser");
        this._auth.authenticatedUser = JSON.parse(localStorage.getItem("loggedUser")!);
        this._auth.isUserLoggedIn = false;
        this._router.navigate(["login"])
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/Models/AuthResponse';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  signupForm!: FormGroup;
  errors: string[] = [];
  message = '';

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.signup(this.signupForm.value).subscribe(
      (res: AuthResponse) => {
        this.authService.isUserLoggedIn = true;
        this.authService.authenticatedUser = res;
        localStorage.setItem('loggedUser', JSON.stringify(res))
        this.router.navigate(["home"])
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

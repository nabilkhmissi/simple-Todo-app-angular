import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthResponse } from 'src/app/Models/AuthResponse';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    @Output() doChangeHeaderStats: EventEmitter<boolean> = new EventEmitter();
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = "";
    errors: string[] = [];
    message = "";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private _auth: AuthenticationService
    ) { }


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    login() {
        this.doChangeHeaderStats.emit(true);
        this._auth.login(this.loginForm.value).subscribe(
            (res: AuthResponse) => {
                this._auth.authenticatedUser = res;
                this._auth.isUserLoggedIn = true

                localStorage.setItem('loggedUser', JSON.stringify(res))
                this.router.navigate(['home'])
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
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _category: CategoryService,
    private _auth: AuthenticationService) { }
  category: Category = new Category();
  message = '';
  errors: string[] = [];
  ngOnInit(): void {
  }

  save() {
    this.category.user = this._auth.authenticatedUser;
    console.log(this.category)
    this._category.create(this.category).subscribe(
      () => {
        this.errors = [];
        this.message = "category saved successfully"
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

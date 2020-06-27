import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent {
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  });

  successMsg: string;
  localStorage = localStorage;

  constructor(
    private app: AppComponent,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  onLogin(): void {
    const formData = this.loginForm.value;
    this.apiService.login(formData)
      .subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('access_token', response.access_token);
          this.router.navigateByUrl('/protected');
        },
        (error) => {
          console.log(error);
          this.app.openDialog('Error', this.app.getErrorMessage(error));
        }
      );
  }

  onRegister(): void {
    let formData = this.registerForm.value;
    if (formData.password1 === formData.password2) {
      formData = {username: formData.username, password: formData.password1};
      this.apiService.createAccount(formData)
        .subscribe(
          (response) => {
            console.log(response);
            this.app.openDialog('Success', 'Account created successfully!');
            this.registerForm.reset();
          },
          (error) => {
            console.log(error);
            this.app.openDialog('Error', this.app.getErrorMessage(error));
          }
        );
    } else {
      this.app.openDialog('Error', 'Passwords do not match');
    }
  }

}

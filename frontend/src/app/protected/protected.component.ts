import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  providers: [ApiService]
})
export class ProtectedComponent implements OnInit {

  constructor(
    private app: AppComponent,
    private apiService: ApiService,
    private router: Router
  ) {
  }

  deleteAccountForm = new FormGroup({
    password: new FormControl('')
  });

  protectedData: string;
  username: string;


  ngOnInit(): void {
    this.apiService.getProtectedData()
      .subscribe(
        (response) => {
          console.log(response);
          this.protectedData = response.data;
          this.username = response.username;
        },
        (error) => {
          console.log(error);
          this.protectedData = this.app.getErrorMessage(error);
          this.username = 'Error';
        }
      );
  }

  onDeleteAccount(): void {
    const formData = this.deleteAccountForm.value;
    this.apiService.deleteAccount(formData)
      .subscribe(
        (response) => {
          console.log(response);
          localStorage.removeItem('access_token');
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log(error);
          this.app.openDialog('Error', this.app.getErrorMessage(error));
        }
      );
    this.deleteAccountForm.reset();
  }

  public openDialogByRef(ref: TemplateRef<any>): void {
    this.app.openDialogByRef(ref);
  }

}

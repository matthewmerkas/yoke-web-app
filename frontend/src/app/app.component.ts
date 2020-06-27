import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;

  title = 'Web App Frontend';
  dialogTitle: string;
  dialogMessage: string;
  localStorage = localStorage;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  public openDialog(dialogTitle: string, dialogMessage: string): void {
    this.dialogTitle = dialogTitle;
    this.dialogMessage = dialogMessage;
    this.dialog.open(this.dialogTemplate);
  }

  public openDialogByRef(ref: TemplateRef<any>): void {
    this.dialog.open(ref);
  }

  onLogout(): void {
    this.apiService.logout()
      .subscribe(
        (response) => {
          localStorage.removeItem('access_token');
          console.log(response);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log(error);
          this.openDialog('Error', this.getErrorMessage(error));
        }
      );
  }

  getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Could not connect to API';
    } else if (error.status === 500) {
      return 'Internal server error';
    } else {
      return error.error.message;
    }
  }

}

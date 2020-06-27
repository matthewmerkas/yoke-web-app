import { Injectable } from '@angular/core';
import { environment} from '../environments/environment';

import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

  public login(formData: any): any {
    return this.http.post<any>(API_URL + '/login', formData);
  }

  public logout(): any {
    return this.http.post<any>(API_URL + '/logout', {});
  }

  public createAccount(formData: any): any {
    return this.http.post<any>(API_URL + '/create_account', formData);
  }

  public deleteAccount(formData: any): any {
    return this.http.post<any>(API_URL + '/delete_account', formData);
  }

  public getProtectedData(): any {
    return this.http.get(API_URL + '/protected');
  }

}

import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';
const API_URL = environment.apiUrl;
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
    login(username, password) {
        return this.http
            .post(API_URL + '/home', { username, password })
            .pipe(map((response) => {
            catchError(this.handleError);
            const decoded = jwt_decode(response.access_token);
            return new User(decoded.id, decoded.username);
        }));
    }
    logout() {
        return this.http
            .post(API_URL + '/logout', {})
            .pipe(map((response) => {
            catchError(this.handleError);
            return response;
        }));
    }
    createAccount(username, password) {
        return this.http
            .post(API_URL + '/create_account', { username, password })
            .pipe(map((response) => {
            catchError(this.handleError);
            return response;
        }));
    }
    deleteAccount(password) {
        return this.http
            .post(API_URL + '/delete_account', { password })
            .pipe(map((response) => {
            catchError(this.handleError);
            return response;
        }));
    }
};
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map

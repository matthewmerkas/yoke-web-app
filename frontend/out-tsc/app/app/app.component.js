import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ApiService } from './api.service';
let AppComponent = class AppComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.title = 'frontend';
    }
    onLogin(username, password) {
        this.apiService
            .login(username, password)
            .subscribe((response) => {
            // Route to protected component
        }, (response) => {
            // Notify error component (maybe do this elsewhere)
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        providers: [ApiService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
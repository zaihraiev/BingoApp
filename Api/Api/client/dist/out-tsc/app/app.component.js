import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(accountSevice, presence) {
        this.accountSevice = accountSevice;
        this.presence = presence;
        this.title = 'The dating app';
    }
    ngOnInit() {
        this.setCurrentUser();
    }
    setCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.accountSevice.setCurrentUser(user);
            this.presence.createHubConnection(user);
        }
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
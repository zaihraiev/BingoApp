import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MessagesComponent = class MessagesComponent {
    constructor(messageService, confirmService) {
        this.messageService = messageService;
        this.confirmService = confirmService;
        this.messages = [];
        this.pageNumber = 1;
        this.pageSize = 5;
    }
    ngOnInit() {
        this.loadMessages();
    }
    loadMessages() {
        this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
            this.messages = response.result;
            this.pagination = response.pagination;
        });
    }
    deleteMessage(id) {
        this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
            if (result) {
                this.messageService.deleteMessage(id).subscribe(() => {
                    this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
                });
            }
        });
    }
    pageChanged(event) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadMessages();
        }
    }
};
MessagesComponent = __decorate([
    Component({
        selector: 'app-messages',
        templateUrl: './messages.component.html',
        styleUrls: ['./messages.component.css']
    })
], MessagesComponent);
export { MessagesComponent };
//# sourceMappingURL=messages.component.js.map
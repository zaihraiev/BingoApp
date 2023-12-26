import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
let MessageService = class MessageService {
    constructor(http) {
        this.http = http;
        this.baseUrl = environment.apiUrl;
        this.hubUrl = environment.hubUrl;
        this.messageThreadSource = new BehaviorSubject([]);
        this.messageThread$ = this.messageThreadSource.asObservable();
    }
    createHubConnection(user, otherUsername) {
        this.hubConenction = new HubConnectionBuilder()
            .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
            accessTokenFactory: () => user.token
        })
            .withAutomaticReconnect()
            .build();
        this.hubConenction.start().catch(error => console.log(error));
        this.hubConenction.on('ReceiveMessageThread', messages => {
            this.messageThreadSource.next(messages);
        });
        this.hubConenction.on('NewMessage', message => {
            this.messageThread$.pipe(take(1)).subscribe(messages => {
                this.messageThreadSource.next([...messages, message]);
            });
        });
        this.hubConenction.on('UpdatedGroup', (group) => {
            if (group.connections.some(x => x.username === otherUsername)) {
                this.messageThread$.pipe(take(1)).subscribe(messages => {
                    messages.forEach(message => {
                        if (!message.dateRead) {
                            message.dateRead = new Date(Date.now());
                        }
                    });
                    this.messageThreadSource.next([...messages]);
                });
            }
        });
    }
    stopHubConnection() {
        if (this.hubConenction) {
            this.hubConenction.stop();
        }
    }
    getMessages(pageNumber, pageSize, container) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('Container', container);
        return getPaginatedResult(this.baseUrl + 'messages', params, this.http);
    }
    getMessageThread(username) {
        return this.http.get(this.baseUrl + 'messages/thread/' + username);
    }
    async sendMessage(username, content) {
        return this.hubConenction.invoke('SendMessage', { recipientUsername: username, content })
            .catch(error => console.log(error));
    }
    deleteMessage(id) {
        return this.http.delete(this.baseUrl + 'messages/' + id);
    }
};
MessageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map
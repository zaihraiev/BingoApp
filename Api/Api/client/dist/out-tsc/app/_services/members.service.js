var _a;
import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserParams } from '../_models/userParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
const httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + ((_a = JSON.parse(localStorage.getItem('user'))) === null || _a === void 0 ? void 0 : _a.token)
    })
};
let MembersService = class MembersService {
    constructor(http, accountService) {
        this.http = http;
        this.accountService = accountService;
        this.baseUrl = environment.apiUrl;
        this.members = [];
        this.memberCache = new Map();
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
            this.user = user;
            this.userParams = new UserParams(user);
        });
    }
    getUserParams() {
        return this.userParams;
    }
    setUserParams(params) {
        this.userParams = params;
    }
    resetUserParams() {
        this.userParams = new UserParams(this.user);
        return this.userParams;
    }
    getMembers(userParams) {
        var response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) {
            return of(response);
        }
        let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString());
        params = params.append('gender', userParams.gender);
        params = params.append('orderBy', userParams.orderBy);
        return getPaginatedResult(this.baseUrl + 'users', params, this.http)
            .pipe(map(response => {
            this.memberCache.set(Object.values(userParams).join('-'), response);
            return response;
        }));
    }
    getMember(username) {
        const member = [...this.memberCache.values()]
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((member) => member.username === username);
        if (member) {
            return of(member);
        }
        return this.http.get(this.baseUrl + 'users/' + username, httpOptions);
    }
    updateMember(member) {
        return this.http.put(this.baseUrl + 'users', member, httpOptions).pipe(map(() => {
            const index = this.members.indexOf(member);
            this.members[index] = member;
        }));
    }
    setMainPhoto(photoId) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }
    deletePhoto(photoId) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, httpOptions);
    }
    addLike(username) {
        return this.http.post(this.baseUrl + 'likes/' + username, {});
    }
    getLikes(predicate, pageNumber, pageSize) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);
        return getPaginatedResult(this.baseUrl + 'likes', params, this.http);
    }
};
MembersService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MembersService);
export { MembersService };
//# sourceMappingURL=members.service.js.map
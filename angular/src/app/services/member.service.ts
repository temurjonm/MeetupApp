import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { AccountService } from './account.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
    private _accountService = inject(AccountService);

    getMembers() {
      return this.http.get<IMember[]>(this.baseUrl + 'users', this.getHttpOptions());
    }

    getMember(username: string) {
      return this.http.get<IMember>(`${this.baseUrl}users/${username}`, this.getHttpOptions());
    }

    getHttpOptions() {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this._accountService.currentUser()?.token}`
        })
      }
    }
}

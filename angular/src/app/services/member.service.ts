import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {

    getMembers() {
      return this.http.get<IMember[]>(this.baseUrl + 'users');
    }

    getMember(username: string) {
      return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
    }

}

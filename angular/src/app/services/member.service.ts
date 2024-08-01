import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { IUsers } from '../models/users.model';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
    members = signal<IMember[]>([]);

    getMembers() {
      return this.http.get<IMember[]>(this.baseUrl + 'users').subscribe({
          next: members => this.members.set(members)
        });
    }

    getMember(username: string) {
      const member = this.members().find(m => m.username === username);
      if (member) return of(member);
      return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
    }

    updateMember(member: IMember) {
      return this.http.put<void>(`${this.baseUrl}users`, member).pipe(
        tap(() => {
          this.members.update(members => members
            .map(m => m.username === member.username ? member : m))
        })
      );
    }

}

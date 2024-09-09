import { inject, Injectable, model, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { of } from 'rxjs';
import { IPhoto } from '../models/photo.model';
import { PaginatedResult } from '../models/pagination.model';
import { UserParams } from '../models/userParams.model';
import { AccountService } from './account.service';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
    private accountService = inject(AccountService);

    paginatedResult = signal<PaginatedResult<IMember[]> | null>(null);
    memberCache = new Map();
    user = this.accountService.currentUser();
    userParams = signal<UserParams>(new UserParams(this.user));

    resetUserParams() {
      this.userParams.set(new UserParams(this.user));
    }

    getMembers() {
      const response = this.memberCache.get(Object.values(this.userParams()).join('-'));
      if (response) return setPaginatedResponse(response, this.paginatedResult);

      let params = setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);

      params = params.append('minAge', this.userParams().minAge.toString());
      params = params.append('maxAge', this.userParams().maxAge.toString());
      params = params.append('gender', this.userParams().gender);
      params = params.append('orderBy', this.userParams().orderBy);

      return this.http.get<IMember[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
          next: response => {
            setPaginatedResponse(response, this.paginatedResult);
            this.memberCache.set(Object.values(this.userParams()).join('-'), response); 
          }
        });
    }

    getMember(username: string) {
      // const member = this.members().find(m => m.username === username);
      // if (member) return of(member);
      const member: IMember = [...this.memberCache.values()]
        .reduce((arr, elem) => arr.concat(elem.body), [])
        .find((member: IMember) => member.username === username);

      if (member) return of(member);

      return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
    }

    updateMember(member: IMember) {
      return this.http.put<void>(`${this.baseUrl}users`, member).pipe(
        /*tap(() => {
          this.members.update(members => members
            .map(m => m.username === member.username ? member : m))
        }) */
      );
    }

    setMainPhoto(photo: IPhoto) {
      if (!photo || !photo.id) {
        throw new Error('Invalid photo');
      }
      return this.http.put<void>(`${this.baseUrl}users/set-main-photo/${photo.id}`, {});
    }

    deletePhoto(photo: IPhoto) {
      return this.http.delete<void>(`${this.baseUrl}users/delete-photo/${photo.id}`);
    }

  }
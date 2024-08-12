import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { map, of, tap } from 'rxjs';
import { IPhoto } from '../models/photo.model';
import { PaginatedResult } from '../models/pagination.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
    // members = signal<IMember[]>([]);
    paginatedResult = signal<PaginatedResult<IMember[]> | null>(null);

    getMembers(pageNumber?: number, pageSize?: number) {
      let params = new HttpParams();

      if (pageNumber && pageSize) {
        params = params.append('pageNumber', pageNumber.toString());
        params = params.append('pageSize', pageSize.toString());
      }

      return this.http.get<IMember[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
          next: response => {
            this.paginatedResult.set({
              items: response.body as IMember[],
              pagination: JSON.parse(response.headers.get('Pagination')!)
            })
          }
        });
    }

    getMember(username: string) {
      // const member = this.members().find(m => m.username === username);
      // if (member) return of(member);
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
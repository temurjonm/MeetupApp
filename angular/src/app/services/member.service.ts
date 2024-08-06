import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { IUsers } from '../models/users.model';
import { map, of, tap } from 'rxjs';
import { IPhoto } from '../models/photo.model';

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

    setMainPhoto(photo: IPhoto) {
      if (!photo || !photo.id) {
        throw new Error('Invalid photo');
      }
      return this.http.put<void>(`${this.baseUrl}users/set-main-photo/${photo.id}`, {})
      .pipe(
        tap(() => {
          this.members.update(members => members?.map(m => {
              if (m.photos?.includes(photo)) {
                m.photoUrl = photo.url;
              }
              return m;
          }) || []);
      }));
    }

    deletePhoto(photo: IPhoto) {
      return this.http.delete<void>(`${this.baseUrl}users/delete-photo/${photo.id}`)
      .pipe(
        map(() => {
          this.members.update(members => members?.map(m => {
            if (m.photos?.includes(photo)) {
              m.photos = m.photos?.filter(p => p.id !== photo.id);
            }
            return m;
          }))
        })
      )
    }

  }
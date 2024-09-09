import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map } from 'rxjs';
import { User } from '../models/users.model';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {
    private likeService = inject(LikesService);
    
    login(user: {username: string, password: string}) {
      return this.http.post<User>(this.baseUrl + 'account/login', user)
      .pipe(
        map(user => {
          if (user) {
            this.setCurrentUser(user);
          }
        })
      )
      ;
    }

    register(user: {username: string, password: string}) {
      return this.http.post<User>(this.baseUrl + 'account/register', user)
      .pipe(
        map(user => {
          if (user) {
            this.setCurrentUser(user);
          }
          return user;
        })
      );
    }

    setCurrentUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user))
      this.currentUser.set(user);
      this.likeService.getLikeIds();
    }

    logout() {
      localStorage.removeItem('user');
      this.currentUser.set(null);
    }
}

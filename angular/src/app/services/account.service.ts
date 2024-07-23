import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

    login(user: {username: string, password: string}) {
      return this.http.post<User>(this.baseUrl + 'account/login', user)
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            this.currentUser.set(user);
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
            localStorage.setItem('user', JSON.stringify(user))
            this.currentUser.set(user);
          }
          return user;
        })
      );
    }

    logout() {
      localStorage.removeItem('user');
      this.currentUser.set(null);
    }
}

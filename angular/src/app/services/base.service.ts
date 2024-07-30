import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/users.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  currentUser = signal<User | null>(null);
 
}

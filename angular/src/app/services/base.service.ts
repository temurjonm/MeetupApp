import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/'
  currentUser = signal<User | null>(null);
  
}

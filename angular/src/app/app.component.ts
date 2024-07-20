import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/users.service';
import { Observable } from 'rxjs';
import { IUsers } from "./models/users.model";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  users$!: Observable<IUsers[]>; 
  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }
}

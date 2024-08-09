import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { Observable } from 'rxjs';
import { IUsers } from '../../models/users.model';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userService = inject(UserService);

  registerMode = false;
  users$!: Observable<IUsers[]>; 

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  
  registerToogle() {
    this.registerMode = !this.registerMode;
  }

  handleCancelRegister(event: any) {
    this.registerMode = event;
  }
}

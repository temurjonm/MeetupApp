import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  accountService = inject(AccountService);
  loginForm!: FormGroup;
  userInfo = {};

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  handleLogin() {
    this.accountService.login(this.loginForm.getRawValue())
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => console.error(error)
      })
  }

  logout() {
    this.accountService.logout();
  }
}

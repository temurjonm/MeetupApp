import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
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
        next: () => {
          this.router.navigateByUrl("/members");
        },
        error: error => this.toastr.error(error.error)
      })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}

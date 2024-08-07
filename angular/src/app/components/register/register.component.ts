import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  registerForm!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator('password')]]
    });

    this.registerForm.controls["password"].valueChanges.subscribe(() => {
      this.registerForm.controls["confirmPassword"].updateValueAndValidity();
    });
  }

  passwordMatchValidator(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const matchControl = control.parent?.get(matchTo);
      return matchControl?.value === control.value ? null : { 'mismatch': true };
    };
  }

  register() {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.getRawValue()).subscribe({
        next: response => {
          console.log(response);
          this.cancel();
        },
        error: error => console.error(error)
      });
    }
  }

  cancel() {
    // handle cancel logic here
  }
}
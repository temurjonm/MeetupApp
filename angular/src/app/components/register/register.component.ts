import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../../shared/forms/text-input/text-input.component";
import { DatePickerComponent } from "../../shared/forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cancelRegister = inject(EventEmitter);

  registerForm!: FormGroup;
  maxDate = new Date();
  validationErrors: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.registerForm.controls["password"].valueChanges.subscribe(() => {
      this.registerForm.controls["confirmPassword"].updateValueAndValidity();
    });
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator('password')]]
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
      const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
      const values = {...this.registerForm.value, dateOfBirth: dob};
      
      this.accountService.register(values).subscribe({
        next: _ => this.router.navigateByUrl('/members'),
        error: error => this.validationErrors = error
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let [year, month, day] = dob.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
}
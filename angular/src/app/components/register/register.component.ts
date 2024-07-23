import { Component, OnInit, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  cancelRegister = output<boolean>();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.getRawValue())
        .subscribe({
          next: response => {
            console.log(response);
            this.cancel();
          },
          error: error => console.error(error)
        });
    } 
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

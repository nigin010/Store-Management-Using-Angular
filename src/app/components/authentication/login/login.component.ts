import { AuthenticationService } from './../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  failureToast: boolean | null = null;
  errorText!: string;
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authenticationService
        .login(formData.username, formData.password)
        .subscribe((data) => {
          if (data.status == 'fail') {
            this.errorText = data.error;
            this.failureToast = true;
            setTimeout(() => {
              this.failureToast = null;
            }, 3000);
          } else if (data.data.roleId == 1) {
            sessionStorage.setItem('roleId', '1');
            sessionStorage.setItem('name', data.data.name);
            this.router.navigate(['/admin-home']);
          } else {
            sessionStorage.setItem('roleId', '2');
            sessionStorage.setItem('name', data.data.name);
            this.router.navigate(['/view-store']);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}

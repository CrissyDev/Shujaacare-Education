import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.form = this.fb.group(
      {
        displayName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreeToTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit() {
    this.markFormGroupTouched(this.form);

    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const { displayName, email, password } = this.form.value;

      await this.authService.signUp(email, password, { displayName });

      this.successMessage = 'Account created successfully! Redirecting...';

      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = error?.message || 'An error occurred during sign-up';
    } finally {
      this.isLoading = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class SigninComponent {
  email = '';
  password = '';
  showPassword = false;
  isSubmitting = false;
  successMessage = '';

  errors: { email?: string; password?: string } = {};

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errors = {};

    if (!this.emailRegex.test(this.email.trim())) {
      this.errors.email = 'Enter a valid email address.';
    }
    if (!this.password) {
      this.errors.password = 'Enter your password.';
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    // No backend yet — this is where a real auth request would go.
    this.isSubmitting = true;
    setTimeout(() => {
      this.successMessage = 'Signed in successfully. (Mock only — there is no dashboard page yet.)';
      this.isSubmitting = false;
    }, 600);
  }
}

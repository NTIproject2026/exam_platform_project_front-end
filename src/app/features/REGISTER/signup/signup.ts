import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errors = {};

    if (!this.firstName.trim()) {
      this.errors.firstName = 'Enter your first name.';
    }
    if (!this.lastName.trim()) {
      this.errors.lastName = 'Enter your last name.';
    }
    if (!this.emailRegex.test(this.email.trim())) {
      this.errors.email = 'Enter a valid email address.';
    }
    if (this.password.length < 8) {
      this.errors.password = 'Password must be at least 8 characters.';
    }
    if (!this.confirmPassword || this.confirmPassword !== this.password) {
      this.errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    // No backend yet — mock success and hand off to Sign in.
    this.router.navigate(['/signin'], { queryParams: { created: 1 } });
  }
}

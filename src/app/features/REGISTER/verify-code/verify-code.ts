import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verify-code.html',
  styleUrls: ['./verify-code.css']
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  code = '';
  errors: { code?: string } = {};

  resendDisabled = false;
  resendLabel = 'Resend';

  private cooldownTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCooldown(30);
  }

  ngOnDestroy(): void {
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }
  }

  startCooldown(seconds: number): void {
    let remaining = seconds;
    this.resendDisabled = true;
    this.resendLabel = `Resend in ${remaining}s`;

    this.cooldownTimer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        if (this.cooldownTimer) {
          clearInterval(this.cooldownTimer);
        }
        this.resendDisabled = false;
        this.resendLabel = 'Resend';
      } else {
        this.resendLabel = `Resend in ${remaining}s`;
      }
    }, 1000);
  }

  onResend(): void {
    if (this.resendDisabled) {
      return;
    }
    this.startCooldown(30);
  }

  onSubmit(): void {
    this.errors = {};

    if (!/^\d{6}$/.test(this.code.trim())) {
      this.errors.code = 'Enter the 6-digit code we sent you.';
      return;
    }

    // No reset-password screen exists yet, so verifying sends the
    // person back to Sign in with a confirmation banner.
    this.router.navigate(['/signin'], { queryParams: { verified: 1 } });
  }
}

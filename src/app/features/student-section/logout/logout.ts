import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  onConfirmLogout(): void {
    // No backend yet — this is where a real sign-out request (clearing the
    // session/token) would go before redirecting to sign in.
    this.router.navigate(['/signin']);
  }
}

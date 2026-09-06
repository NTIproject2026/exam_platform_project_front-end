import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {

  constructor(private router: Router) {}

  // Navigate to Courses
  onStartLearning(): void {
    console.log('Start Learning button clicked');
    // Router navigation example:
    // this.router.navigate(['/courses']);
  }

  onBrowseCourses(): void {
    console.log('Browse Courses button clicked');
    // this.router.navigate(['/courses']);
  }

  // Authentication Navigation
  onSignIn(event: Event): void {
    event.preventDefault();
    console.log('Sign in clicked');
    // this.router.navigate(['/login']);
  }

  onGetStarted(): void {
    console.log('Get started clicked');
    // this.router.navigate(['/register']);
  }
}

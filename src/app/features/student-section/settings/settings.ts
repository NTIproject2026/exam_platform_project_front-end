import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,SidebarComponent],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent {
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;

  // No backend yet — this is where a real "current user" fetch would go.
  firstName = 'Youssef';
  lastName = 'Hegazy';
  username = 'Youssef.codes';
  email = 'Youssef9@devora.io';
  bio = 'Frontend learner building toward a career switch into web development.';

  avatarUrl: string | null = null;
  savedBannerVisible = false;
  private savedBannerTimer: ReturnType<typeof setTimeout> | null = null;

  private snapshot = this.takeSnapshot();

  constructor(private router: Router) {}

  get initials(): string {
    return `${this.firstName[0] ?? ''}${this.lastName[0] ?? ''}`.toUpperCase();
  }

  onChangePhotoClick(): void {
    this.photoInput?.nativeElement.click();
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    // No upload endpoint yet — preview locally only.
    const reader = new FileReader();
    reader.onload = () => (this.avatarUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  onCancel(): void {
    const snap = this.snapshot;
    this.firstName = snap.firstName;
    this.lastName = snap.lastName;
    this.username = snap.username;
    this.email = snap.email;
    this.bio = snap.bio;
    this.avatarUrl = snap.avatarUrl;
  }

  onSubmit(): void {
    // No backend yet — this is where a real "update profile" request would go.
    this.snapshot = this.takeSnapshot();

    this.savedBannerVisible = true;
    if (this.savedBannerTimer) {
      clearTimeout(this.savedBannerTimer);
    }
    this.savedBannerTimer = setTimeout(() => (this.savedBannerVisible = false), 2500);
  }

  private takeSnapshot() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      bio: this.bio,
      avatarUrl: this.avatarUrl
    };
  }
}

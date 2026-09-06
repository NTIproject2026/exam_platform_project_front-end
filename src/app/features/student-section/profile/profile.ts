import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

interface Stat {
  value: string;
  label: string;
}

interface Achievement {
  title: string;
  finishedOn: string;
  iconBg: string;
  icon: 'html' | 'css' | 'js';
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink,SidebarComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  // No backend yet — this is where a real "current user" fetch would go.
  fullName = 'Youssef Essam';
  username = 'Youssef.codes';
  email = 'Youssef9@devora.io';
  bio =
    'Frontend learner building toward a career switch into web development. Currently deep in React.';

  stats: Stat[] = [
    { value: '73%', label: 'overall progress' },
    { value: '124h', label: 'Learning Hours' },
    { value: '84%', label: 'Quiz Average' },
    { value: '12 days', label: 'Current streak' }
  ];

  achievements: Achievement[] = [
    { title: 'HTML Courses', finishedOn: '8/3/2026', iconBg: '#e34f26', icon: 'html' },
    { title: 'CSS Courses', finishedOn: '8/3/2026', iconBg: '#1572b6', icon: 'css' },
    { title: 'JS Courses', finishedOn: '8/3/2026', iconBg: '#f0db4f', icon: 'js' }
  ];

  get initials(): string {
    return this.fullName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  onViewAchievement(achievement: Achievement): void {
    // No achievement detail page yet — hook this up once one exists.
    console.log('View achievement:', achievement.title);
  }
}

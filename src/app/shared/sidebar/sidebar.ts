import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  isLogout?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  logoText: string = 'Devora';
  logoIcon: string = 'D';

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '▦', route: '/dashboard' },
    { label: 'Courses', icon: '🎓', route: '/courses' },
    { label: 'Quizzes', icon: '💡', route: '/quizzes' },
    { label: 'Progress', icon: '📈', route: '/progress' },
    { label: 'Achievement', icon: '🏅', route: '/achievement' },
    { label: 'Profile', icon: '👤', route: '/profile' },
    { label: 'Settings', icon: '⚙️', route: '/settings' },
    { label: 'Log Out', icon: '🚪', route: '/login', isLogout: true }
  ];

  constructor(private router: Router) {}

  handleNavClick(item: NavItem): void {
    if (item.isLogout) {
      // يمكنك إضافة منطق تسجيل الخروج هنا (مثلاً مسح الـ Token)
      localStorage.clear();
    }
    this.router.navigate([item.route]);
  }
}

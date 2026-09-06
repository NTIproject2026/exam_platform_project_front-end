import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// تعريف واجهة بيانات عنصر القائمة
interface NavItem {
  label: string;
  iconClass: string; // كلاسات FontAwesome للإيقونات
  route: string;
  isLogout?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.admin.html',
  styleUrls: ['./sidebar.admin.css']
})
export class SidebarComponent {
  brandName: string = 'Devora';
  brandIconLetter: string = 'D';

  // مصفوفة الخيارات الديناميكية بناءً على كود HTML الخاص بك
  navItems: NavItem[] = [
    { label: 'Dashboard', iconClass: 'fa-solid fa-table-cells-large', route: '/dashboard' },
    { label: 'Courses', iconClass: 'fa-solid fa-graduation-cap', route: '/manage-courses' },
    { label: 'Quizzes', iconClass: 'fa-solid fa-lightbulb', route: '/quizzes' },
    { label: 'Students', iconClass: 'fa-solid fa-user-graduate', route: '/students' },
    { label: 'Profile', iconClass: 'fa-solid fa-user', route: '/profile' },
    { label: 'Settings', iconClass: 'fa-solid fa-gear', route: '/settings' },
    { label: 'Log Out', iconClass: 'fa-solid fa-right-from-bracket', route: '/login', isLogout: true }
  ];

  handleNavClick(item: NavItem): void {
    if (item.isLogout) {
      this.onLogout();
    }
  }

  private onLogout(): void {
    console.log('Logging out user...');
  }
}

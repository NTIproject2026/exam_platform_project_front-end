import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchHeader } from '../../../shared/search.header/search.header';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';

interface Metric {
  label: string;
  value: number;
  icon: string;
  bgClass: string;
}

interface ActivityDay {
  label: string;
  value: number;
}

interface CourseProgress {
  rank: number;
  name: string;
  percentage: number;
}

interface StudentRecord {
  id: number;
  name: string;
  course: string;
  passedTests: string;
  state: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SidebarComponent,SearchHeader],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  searchTerm: string = '';

  metrics: Metric[] = [
    { label: 'Total courses', value: 340, icon: 'fa-solid fa-graduation-cap', bgClass: 'icon-blue' },
    { label: 'Total Students', value: 2000, icon: 'fa-solid fa-user', bgClass: 'icon-green' },
    { label: 'Total Instructors', value: 50, icon: 'fa-solid fa-chalkboard-user', bgClass: 'icon-yellow' },
    { label: 'Total Lessons', value: 3500, icon: 'fa-solid fa-book-open', bgClass: 'icon-red' }
  ];

  weeklyActivity: ActivityDay[] = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 65 },
    { label: 'Wed', value: 30 },
    { label: 'Thu', value: 85 },
    { label: 'Fri', value: 50 },
    { label: 'Sat', value: 95 },
    { label: 'Sun', value: 70 }
  ];

  topCourses: CourseProgress[] = [
    { rank: 1, name: 'HTML & Css', percentage: 45 },
    { rank: 2, name: 'Python', percentage: 30 },
    { rank: 3, name: 'C++', percentage: 25 },
    { rank: 4, name: 'Javascript', percentage: 20 },
    { rank: 5, name: 'React', percentage: 10 }
  ];

  students: StudentRecord[] = [
    { id: 1, name: 'Youssef Essam', course: 'Python', passedTests: '10/10', state: 'Excellence' },
    { id: 2, name: 'Ahmed Mohamed', course: 'HTML', passedTests: '9/10', state: 'Very Good' },
    { id: 3, name: 'Malak Mohamed', course: 'Java', passedTests: '8/10', state: 'Good' },
    { id: 4, name: 'Ahmed Samy', course: 'C++', passedTests: '7/10', state: 'Good' },
    { id: 5, name: 'Sayed Mohsen', course: 'React', passedTests: '6/10', state: 'Accepted' }
  ];

  get filteredStudents(): StudentRecord[] {
    if (!this.searchTerm.trim()) {
      return this.students;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.students.filter(
      s => s.name.toLowerCase().includes(term) || s.course.toLowerCase().includes(term)
    );
  }

  onNavigateToDashboard(studentName: string): void {
    alert(`Navigating to dashboard for: ${studentName}`);
  }
}

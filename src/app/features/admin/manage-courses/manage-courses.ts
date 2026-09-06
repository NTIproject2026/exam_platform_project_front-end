
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';
import { SearchHeader } from '../../../shared/search.header/search.header';

interface Course {
  id: number;
  title: string;
  author: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  brandClass: string;
  icon?: string;
  brandText?: string;
}

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, RouterModule,SidebarComponent,SearchHeader],
  templateUrl: './manage-courses.html',
  styleUrls: ['./manage-courses.css']
})
export class ManageCoursesComponent {
  @Input() searchTerm: string = '';

  courses: Course[] = [
    {
      id: 1,
      title: 'HTML COURSES',
      author: 'Developer',
      duration: '8h',
      lessonsCount: 24,
      rating: 4.7,
      brandClass: 'html-bg',
      icon: 'fa-brands fa-html5'
    },
    {
      id: 2,
      title: 'CSS COURSES',
      author: 'Developer',
      duration: '13h',
      lessonsCount: 50,
      rating: 4.7,
      brandClass: 'css-bg',
      icon: 'fa-brands fa-css3-alt'
    },
    {
      id: 3,
      title: 'JS COURSES',
      author: 'Developer',
      duration: '19h',
      lessonsCount: 95,
      rating: 4.7,
      brandClass: 'js-bg',
      icon: 'fa-brands fa-js'
    },
    {
      id: 4,
      title: 'C++ COURSES',
      author: 'Developer',
      duration: '20h',
      lessonsCount: 100,
      rating: 4.7,
      brandClass: 'cpp-bg',
      brandText: 'C++'
    },
    {
      id: 5,
      title: 'React COURSES',
      author: 'Developer',
      duration: '22h',
      lessonsCount: 100,
      rating: 4.7,
      brandClass: 'react-bg',
      icon: 'fa-brands fa-react'
    },
    {
      id: 6,
      title: 'Python COURSES',
      author: 'Developer',
      duration: '22h',
      lessonsCount: 100,
      rating: 4.7,
      brandClass: 'python-bg',
      icon: 'fa-brands fa-python'
    }
  ];

  get filteredCourses(): Course[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.author.toLowerCase().includes(term)
    );
  }

  onCheckCourse(course: Course): void {
    alert(`Opening details for: ${course.title}`);
  }
}

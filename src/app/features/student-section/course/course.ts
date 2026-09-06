import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';
import { SearchHeader } from '../../../shared/search.header/search.header';


// ==========================================
// 1. Interface
// ==========================================
export interface Course {
  id: number;
  title: string;
  category: string;
  icon: string;
  iconClass: string;
  instructor: string;
  duration: string;
  lessons: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: 'Free' | 'Paid';
}

// ==========================================
// 2. Component
// ==========================================
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,SidebarComponent,SearchHeader],
  templateUrl: './course.html',
  styleUrl: './course.css'
})
export class CoursesComponent {

  courses: Course[] = [
    {
      id: 1,
      title: 'HTML COURSES',
      category: 'HTML & CSS',
      icon: 'HTML',
      iconClass: 'html-icon',
      instructor: 'Developer',
      duration: '8h',
      lessons: 24,
      rating: 4.7,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 2,
      title: 'CSS COURSES',
      category: 'HTML & CSS',
      icon: 'CSS',
      iconClass: 'css-icon',
      instructor: 'Developer',
      duration: '13h',
      lessons: 50,
      rating: 4.7,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 3,
      title: 'JS COURSES',
      category: 'Javascript',
      icon: 'JS',
      iconClass: 'js-icon',
      instructor: 'Developer',
      duration: '19h',
      lessons: 95,
      rating: 4.7,
      level: 'Intermediate',
      price: 'Paid'
    },
    {
      id: 4,
      title: 'C++ COURSES',
      category: 'C++',
      icon: 'C',
      iconClass: 'cpp-icon',
      instructor: 'Developer',
      duration: '20h',
      lessons: 100,
      rating: 4.7,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 5,
      title: 'React COURSES',
      category: 'React',
      icon: '⚛',
      iconClass: 'react-icon',
      instructor: 'Developer',
      duration: '22h',
      lessons: 100,
      rating: 4.7,
      level: 'Intermediate',
      price: 'Paid'
    },
    {
      id: 6,
      title: 'Python COURSES',
      category: 'Python',
      icon: '🐍',
      iconClass: 'python-icon',
      instructor: 'Developer',
      duration: '22h',
      lessons: 100,
      rating: 4.7,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 7,
      title: 'Java COURSES',
      category: 'Java',
      icon: '☕',
      iconClass: 'java-icon',
      instructor: 'Developer',
      duration: '22h',
      lessons: 100,
      rating: 4.7,
      level: 'Beginner',
      price: 'Paid'
    },
    {
      id: 8,
      title: 'Git & GitHub COURSES',
      category: 'Git & GitHub',
      icon: 'Git',
      iconClass: 'git-icon',
      instructor: 'Developer',
      duration: '10h',
      lessons: 40,
      rating: 4.7,
      level: 'Beginner',
      price: 'Free'
    }
  ];

  categories: string[] = [
    'All',
    'HTML & CSS',
    'Javascript',
    'React',
    'Python',
    'Java',
    'C++',
    'Git & GitHub'
  ];

  // Current Filters
  searchTerm: string = '';
  selectedCategory: string = 'All';
  selectedLevel: string = 'All';
  selectedPrice: string = 'All';

  showAutocomplete: boolean = false;

  constructor(private router: Router) {}

  // Filtered courses getter
  get filteredCourses(): Course[] {
    const search = this.searchTerm.toLowerCase().trim();

    return this.courses.filter(course => {
      const matchesSearch = !search ||
        course.title.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search);

      const matchesCategory = this.selectedCategory === 'All' || course.category === this.selectedCategory;
      const matchesLevel = this.selectedLevel === 'All' || course.level === this.selectedLevel;
      const matchesPrice = this.selectedPrice === 'All' || course.price === this.selectedPrice;

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }

  // Autocomplete Suggestions
  get autocompleteSuggestions(): Course[] {
    const search = this.searchTerm.toLowerCase().trim();
    if (!search) return [];

    return this.courses
      .filter(course => course.title.toLowerCase().includes(search))
      .slice(0, 5);
  }

  onSearchInput(): void {
    this.showAutocomplete = this.searchTerm.trim().length > 0;
  }

  selectSuggestion(course: Course): void {
    this.searchTerm = course.title;
    this.showAutocomplete = false;
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  navigateToLesson(courseId: number): void {
    this.router.navigate(['/lesson', courseId]);
  }

  enrollCourse(event: Event, courseId: number): void {
    event.stopPropagation(); // منع الانتقال لصفحة الـ Lesson عند الضغط على زر Enroll
    console.log(`Enrolling in course ID: ${courseId}`);
  }
}

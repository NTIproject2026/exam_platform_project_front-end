import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';

interface Course {
  id: number;
  title: string;
  lessonsCount: number;
  duration: string;
  icon: string;
  brandClass: string;
  selected: boolean;
}

@Component({
  selector: 'app-delete-courses',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './delete-courses.html',
  styleUrls: ['./delete-courses.css']
})
export class DeleteCoursesComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'HTML COURSES',
      lessonsCount: 24,
      duration: '8h',
      icon: 'fa-brands fa-html5',
      brandClass: 'html-bg',
      selected: false
    },
    {
      id: 2,
      title: 'CSS COURSES',
      lessonsCount: 50,
      duration: '13h',
      icon: 'fa-brands fa-css3-alt',
      brandClass: 'css-bg',
      selected: false
    },
    {
      id: 3,
      title: 'JS COURSES',
      lessonsCount: 95,
      duration: '19h',
      icon: 'fa-brands fa-js',
      brandClass: 'js-bg',
      selected: false
    }
  ];

  isModalOpen = false;
  itemsToDelete: Course[] = [];

  get hasSelectedCourses(): boolean {
    return this.courses.some(course => course.selected);
  }

  toggleSelection(course: Course): void {
    course.selected = !course.selected;
  }

  onDeleteSingle(course: Course): void {
    this.itemsToDelete = [course];
    this.openModal();
  }

  onDeleteSelected(): void {
    const selected = this.courses.filter(course => course.selected);
    if (selected.length > 0) {
      this.itemsToDelete = selected;
      this.openModal();
    }
  }

  confirmDelete(): void {
    const idsToRemove = new Set(this.itemsToDelete.map(item => item.id));
    this.courses = this.courses.filter(course => !idsToRemove.has(course.id));
    this.itemsToDelete = [];
    this.closeModal();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}

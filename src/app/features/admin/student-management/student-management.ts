import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';
import { SearchHeader } from '../../../shared/search.header/search.header';
import { RouterLink } from '@angular/router';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: string;
  badgeClass: string;
}

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule,SidebarComponent,SearchHeader,RouterLink],
  templateUrl: './student-management.html',
  styleUrls: ['./student-management.css']
})
export class StudentManagementComponent {
  @Input() searchTerm: string = '';

  students: Student[] = [
    {
      id: 1,
      name: 'Youssef Essam',
      email: 'youssef@example.com',
      course: 'Python Course',
      progress: 100,
      status: 'Excellence',
      badgeClass: 'badge-excellence'
    },
    {
      id: 2,
      name: 'Ahmed Mohamed',
      email: 'ahmed@example.com',
      course: 'HTML Course',
      progress: 85,
      status: 'Very Good',
      badgeClass: 'badge-verygood'
    },
    {
      id: 3,
      name: 'Malak Mohamed',
      email: 'malak@example.com',
      course: 'Java Course',
      progress: 70,
      status: 'Good',
      badgeClass: 'badge-good'
    },
    {
      id: 4,
      name: 'Ahmed Samy',
      email: 'samy@example.com',
      course: 'C++ Course',
      progress: 65,
      status: 'Good',
      badgeClass: 'badge-good'
    },
    {
      id: 5,
      name: 'Sayed Mohsen',
      email: 'sayed@example.com',
      course: 'React Course',
      progress: 50,
      status: 'Accepted',
      badgeClass: 'badge-accepted'
    }
  ];

  isModalOpen: boolean = false;
  modalType: 'edit' | 'delete' = 'delete';
  selectedStudent: Student | null = null;

  get filteredStudents(): Student[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.students;
    }
    return this.students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.course.toLowerCase().includes(term)
    );
  }

  openModal(type: 'edit' | 'delete', student: Student): void {
    this.modalType = type;
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }

  confirmAction(): void {
    if (!this.selectedStudent) return;

    if (this.modalType === 'delete') {
      this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
    } else if (this.modalType === 'edit') {
      console.log(`Editing confirmed for: ${this.selectedStudent.name}`);
    }

    this.closeModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}

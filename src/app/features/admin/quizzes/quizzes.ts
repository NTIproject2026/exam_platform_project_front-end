import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';

export interface Quiz {
  id: number;
  title: string;
  course: string;
  time: number;
  questions: number;
  status: 'Active' | 'Draft';
  attempts: number;
}

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,SidebarComponent],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = [
    {
      id: 1,
      title: 'HTML Fundamentals Quiz',
      course: 'HTML COURSES',
      time: 20,
      questions: 15,
      status: 'Active',
      attempts: 42
    },
    {
      id: 2,
      title: 'CSS Flexbox & Grid Master',
      course: 'CSS COURSES',
      time: 30,
      questions: 20,
      status: 'Active',
      attempts: 89
    },
    {
      id: 3,
      title: 'JS Async & ES6 Features',
      course: 'JS COURSES',
      time: 45,
      questions: 25,
      status: 'Draft',
      attempts: 0
    }
  ];

  quizForm!: FormGroup;
  isQuizModalOpen = false;
  isDeleteModalOpen = false;

  selectedQuizId: number | null = null;
  quizToDeleteId: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      time: [null, [Validators.required, Validators.min(1)]],
      questions: [null, [Validators.required, Validators.min(1)]],
      status: ['Active', Validators.required]
    });
  }

  get modalTitle(): string {
    return this.selectedQuizId !== null ? 'Edit Quiz' : 'Create New Quiz';
  }

  openAddModal(): void {
    this.selectedQuizId = null;
    this.quizForm.reset({ status: 'Active' });
    this.isQuizModalOpen = true;
  }

  openEditModal(quiz: Quiz): void {
    this.selectedQuizId = quiz.id;
    this.quizForm.patchValue({
      title: quiz.title,
      course: quiz.course,
      time: quiz.time,
      questions: quiz.questions,
      status: quiz.status
    });
    this.isQuizModalOpen = true;
  }

  closeQuizModal(): void {
    this.isQuizModalOpen = false;
    this.selectedQuizId = null;
  }

  saveQuiz(): void {
    if (this.quizForm.invalid) return;

    const formValues = this.quizForm.value;

    if (this.selectedQuizId !== null) {
      // Edit mode
      const index = this.quizzes.findIndex(q => q.id === this.selectedQuizId);
      if (index !== -1) {
        this.quizzes[index] = {
          ...this.quizzes[index],
          title: formValues.title,
          course: formValues.course,
          time: Number(formValues.time),
          questions: Number(formValues.questions),
          status: formValues.status
        };
      }
    } else {
      // Add mode
      const newQuiz: Quiz = {
        id: Date.now(),
        title: formValues.title,
        course: formValues.course,
        time: Number(formValues.time),
        questions: Number(formValues.questions),
        status: formValues.status,
        attempts: 0
      };
      this.quizzes.unshift(newQuiz);
    }

    this.closeQuizModal();
  }

  openDeleteModal(id: number): void {
    this.quizToDeleteId = id;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.quizToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.quizToDeleteId !== null) {
      this.quizzes = this.quizzes.filter(q => q.id !== this.quizToDeleteId);
    }
    this.closeDeleteModal();
  }
}

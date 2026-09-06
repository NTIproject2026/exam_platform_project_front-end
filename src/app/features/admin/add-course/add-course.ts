import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar.admin/sidebar.admin';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,SidebarComponent],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      instructor: ['', Validators.required],
      lesson: [''],
      description: [''],
      time: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const nameValue = this.courseForm.get('name')?.value?.trim();
    const instructorValue = this.courseForm.get('instructor')?.value?.trim();

    if (!nameValue || !instructorValue) {
      alert('Data is not completed');
      return;
    }

    const courseData = {
      name: nameValue,
      instructor: instructorValue,
      lesson: this.courseForm.get('lesson')?.value?.trim() || '',
      description: this.courseForm.get('description')?.value?.trim() || '',
      time: this.courseForm.get('time')?.value?.trim() || ''
    };

    console.log('Courses data', courseData);
    alert('Data saved successfully');

    this.courseForm.reset();
    this.previewUrl = null;
  }
}

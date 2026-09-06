import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface Lesson {
  id: number;
  module: string;
  title: string;
  duration: string;
  completed: boolean;
  paragraphs: string[];
  code: string;
}

export interface CourseData {
  [key: number]: {
    courseTitle: string;
    lessons: Lesson[];
  };
}

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css'
})
export class LessonComponent implements OnInit {

  courseId: number = 5; // الافتراضي (React)
  currentLessonId: number = 1;

  // بيانات الدروس لكل كورس
  coursesData: CourseData = {
    5: {
      courseTitle: 'React Fundamentals',
      lessons: [
        {
          id: 1,
          module: 'MODULE 1 — GETTING STARTED',
          title: 'What is React?',
          duration: '8 min',
          completed: true,
          paragraphs: [
            'React is a popular JavaScript library for building modern user interfaces created by Meta.',
            'It allows developers to build scalable applications using isolated, reusable building blocks known as components.',
            'React efficiently updates and renders the right components when your application data changes using a Virtual DOM.'
          ],
          code: `// React Element Creation\nimport React from 'react';\n\nconst App = () => {\n  return <h1>Hello, World!</h1>;\n};\n\nexport default App;`
        },
        {
          id: 2,
          module: 'MODULE 1 — GETTING STARTED',
          title: 'Environment setup',
          duration: '12 min',
          completed: true,
          paragraphs: [
            'To begin working with React, you need Node.js and npm installed on your computer.',
            'Vite is currently the fastest tool for setting up a new modern React workspace.'
          ],
          code: `// Terminal Commands\nnpm create vite@latest my-react-app -- --template react\ncd my-react-app\nnpm install\nnpm run dev`
        },
        {
          id: 3,
          module: 'MODULE 1 — GETTING STARTED',
          title: 'Your first component',
          duration: '11 min',
          completed: false,
          paragraphs: [
            'React components are standard JavaScript functions that return JSX markup.',
            'Component names must always start with a capital letter to distinguish them from built-in HTML tags.',
            'Breaking your UI down into smaller nested components keeps code clean and testable.'
          ],
          code: `function Profile() {\n  return (\n    <div className="profile-card">\n      <h2>Jane Doe</h2>\n      <p>Frontend Developer</p>\n    </div>\n  );\n}\n\nexport default Profile;`
        },
        {
          id: 4,
          module: 'MODULE 2 — STATE & HOOKS',
          title: 'useState in depth',
          duration: '14 min',
          completed: false,
          paragraphs: [
            'The useState Hook allows functional components to manage local state statefully.',
            'When state updates using setter functions, React automatically triggers a component re-render.'
          ],
          code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}`
        }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // قراءة الـ Course ID من الـ Route Params إذا كان موجوداً
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.courseId = +params['id'];
      }
    });
  }

  get currentCourse() {
    return this.coursesData[this.courseId] || this.coursesData[5];
  }

  get activeLesson(): Lesson {
    return this.currentCourse.lessons.find(l => l.id === this.currentLessonId) || this.currentCourse.lessons[0];
  }

  get progressPercentage(): number {
    const total = this.currentCourse.lessons.length;
    return (this.currentLessonId / total) * 100;
  }

  get groupedModules() {
    const modules: { [key: string]: Lesson[] } = {};
    this.currentCourse.lessons.forEach(lesson => {
      if (!modules[lesson.module]) {
        modules[lesson.module] = [];
      }
      modules[lesson.module].push(lesson);
    });
    return Object.keys(modules).map(key => ({
      title: key,
      lessons: modules[key]
    }));
  }

  selectLesson(lessonId: number): void {
    this.currentLessonId = lessonId;
  }

  previousLesson(): void {
    if (this.currentLessonId > 1) {
      this.currentLessonId--;
    }
  }

  completeAndContinue(): void {
    this.activeLesson.completed = true;
    if (this.currentLessonId < this.currentCourse.lessons.length) {
      this.currentLessonId++;
    } else {
      alert('🎉 Congratulations! You have completed all lessons in this course!');
    }
  }

  goBackToCourses(): void {
    this.router.navigate(['/courses']);
  }
}

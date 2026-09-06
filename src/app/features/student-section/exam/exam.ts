import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  type: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam.html',
  styleUrls: ['./exam.css']
})
export class ExamComponent implements OnInit, OnDestroy {
  questions: Question[] = [
    {
      id: 1,
      type: 'multiple',
      question: 'Which method adds one or more elements to the end of an array and returns the new length?',
      options: ['array.shift()', 'array.push()', 'array.pop()', 'array.slice()'],
      correct: 1,
      explanation: 'array.push() adds one or more elements to the end of an array and returns the new length.'
    },
    {
      id: 2,
      type: 'multiple',
      question: 'Which method removes the last element from an array and returns that element?',
      options: ['array.push()', 'array.pop()', 'array.shift()', 'array.unshift()'],
      correct: 1,
      explanation: 'array.pop() removes the last element from an array and returns that element.'
    },
    {
      id: 3,
      type: 'truefalse',
      question: 'The array.map() method creates a new array with the results of calling a function on every element.',
      options: ['True', 'False'],
      correct: 0,
      explanation: 'True! array.map() returns a new array with transformed elements.'
    },
    {
      id: 4,
      type: 'code',
      question: 'What will be the output of this code?\n\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);',
      options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'undefined'],
      correct: 1,
      explanation: 'arr.push(4) adds 4 to the end, so output is [1, 2, 3, 4]'
    },
    {
      id: 5,
      type: 'multiple',
      question: 'Which method removes the first element from an array and returns that element?',
      options: ['array.pop()', 'array.push()', 'array.shift()', 'array.unshift()'],
      correct: 2,
      explanation: 'array.shift() removes the first element and returns it.'
    }
  ];

  currentQuestionIndex: number = 0;
  selectedAnswers: { [questionId: number]: number } = {};
  timerInterval: any = null;
  timeLeft: number = 600; // 10 minutes
  timerDisplayFormatted: string = '10:00';
  quizSubmitted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('selectedAnswers');
    if (saved) {
      try {
        this.selectedAnswers = JSON.parse(saved);
      } catch (e) {
        this.selectedAnswers = {};
      }
    }
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  get hasSelectedCurrentAnswer(): boolean {
    return this.selectedAnswers[this.currentQuestion.id] !== undefined;
  }

  selectOption(optIndex: number): void {
    this.selectedAnswers[this.currentQuestion.id] = optIndex;
    localStorage.setItem('selectedAnswers', JSON.stringify(this.selectedAnswers));
  }

  isOptionSelected(optIndex: number): boolean {
    return this.selectedAnswers[this.currentQuestion.id] === optIndex;
  }

  goToPrevious(): void {
    if (!this.isFirstQuestion) {
      this.currentQuestionIndex--;
    }
  }

  goToNext(): void {
    if (!this.hasSelectedCurrentAnswer) {
      alert('Please select an answer before proceeding.');
      return;
    }

    if (!this.isLastQuestion) {
      this.currentQuestionIndex++;
    } else {
      this.submitQuiz();
    }
  }

  exitQuiz(): void {
    const confirmExit = confirm('Are you sure you want to exit the quiz ?');
    if (confirmExit) {
      this.router.navigate(['/quizzes']);
    }
  }

  submitQuiz(): void {
    if (this.quizSubmitted) return;
    this.quizSubmitted = true;

    let correct = 0;
    this.questions.forEach((q) => {
      if (this.selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });

    const percentage = Math.round((correct / this.questions.length) * 100);
    const passed = percentage >= 60;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const result = {
      score: correct,
      total: this.questions.length,
      percentage: percentage,
      passed: passed,
      answers: this.selectedAnswers,
      timeSpent: 600 - this.timeLeft,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('quizResult', JSON.stringify(result));
    localStorage.removeItem('selectedAnswers');
    this.router.navigate(['/result']);
  }

  startTimer(): void {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        alert('Time is up! submitting your quiz ');
        this.submitQuiz();
      }
    }, 1000);
  }

  private updateTimerDisplay(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplayFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

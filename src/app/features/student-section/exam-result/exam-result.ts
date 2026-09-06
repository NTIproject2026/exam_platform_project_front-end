import { Component } from '@angular/core';

@Component({
  selector: 'app-exam-result',
  imports: [],
  templateUrl: './exam-result.html',
  styleUrl: './exam-result.css',
})
export class ExamResult {
   result: any = null;

  questions = [

    {
      id: 1,
      type: "multiple",
      question:
        "Which method adds one or more elements to the end of an array and returns the new length?",
      options: [
        "array.shift()",
        "array.push()",
        "array.pop()",
        "array.slice()"
      ],
      correct: 1,
      explanation:
        "array.push() adds one or more elements to the end of an array and returns the new length."
    },

    {
      id: 2,
      type: "multiple",
      question:
        "Which method removes the last element from an array and returns that element?",
      options: [
        "array.push()",
        "array.pop()",
        "array.shift()",
        "array.unshift()"
      ],
      correct: 1,
      explanation:
        "array.pop() removes the last element from an array and returns that element."
    },

    {
      id: 3,
      type: "truefalse",
      question:
        "The array.map() method creates a new array with the results of calling a function on every element.",
      options: [
        "True",
        "False"
      ],
      correct: 0,
      explanation:
        "True! array.map() returns a new array with transformed elements."
    },

    {
      id: 4,
      type: "code",
      question:
        "What will be the output of this code?\n\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);",
      options: [
        "[1, 2, 3]",
        "[1, 2, 3, 4]",
        "[4, 1, 2, 3]",
        "undefined"
      ],
      correct: 1,
      explanation:
        "arr.push(4) adds 4 to the end, so output is [1, 2, 3, 4]"
    },

    {
      id: 5,
      type: "multiple",
      question:
        "Which method removes the first element from an array and returns that element?",
      options: [
        "array.pop()",
        "array.push()",
        "array.shift()",
        "array.unshift()"
      ],
      correct: 2,
      explanation:
        "array.shift() removes the first element and returns it."
    }

  ];


  ngOnInit(): void {

    const savedResult =
      localStorage.getItem('quizResult');

    if (savedResult) {

      this.result = JSON.parse(savedResult);

    }

  }


  get minutes(): string {

    if (!this.result) {
      return '00';
    }

    return String(
      Math.floor(this.result.timeSpent / 60)
    ).padStart(2, '0');

  }


  get seconds(): string {

    if (!this.result) {
      return '00';
    }

    return String(
      this.result.timeSpent % 60
    ).padStart(2, '0');

  }


  isCorrect(
    questionId: number,
    correctAnswer: number
  ): boolean {

    if (!this.result) {
      return false;
    }

    return (
      this.result.answers[questionId] ===
      correctAnswer
    );

  }


  retryQuiz(): void {

    localStorage.removeItem('quizResult');

    localStorage.removeItem('selectedAnswers');

    window.location.href = '/quiz';

  }


  continueLearning(): void {

    window.location.href = '/quizzes';

  }

}

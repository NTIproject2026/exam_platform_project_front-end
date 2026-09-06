import { Component } from '@angular/core';
import { SearchHeader } from '../../../shared/search.header/search.header';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-quizzes',
  imports: [SearchHeader,SidebarComponent],
  templateUrl: './quizes.html',
  styleUrl: './quizes.css'
})
export class QuizesComponent {


  quizzes = [

    {
      name: "HTML COURSES",
      category: "HTML & CSS",
      questions: 20,
      icon: "fa-brands fa-html5",
      logo: "html"
    },

    {
      name: "CSS COURSES",
      category: "HTML & CSS",
      questions: 20,
      icon: "fa-brands fa-css3-alt",
      logo: "css"
    },

    {
      name: "JS COURSES",
      category: "Javascript",
      questions: 20,
      icon: "fa-brands fa-js",
      logo: "javascript"
    },

    {
      name: "C++ COURSES",
      category: "C++",
      questions: 20,
      icon: "devicon-cplusplus-plain",
      logo: "cpp"
    },

    {
      name: "React COURSES",
      category: "React",
      questions: 20,
      icon: "fa-brands fa-react",
      logo: "react"
    },

    {
      name: "Python COURSES",
      category: "Python",
      questions: 20,
      icon: "fa-brands fa-python",
      logo: "python"
    },

    {
      name: "Java COURSES",
      category: "Java",
      questions: 20,
      icon: "fa-brands fa-java",
      logo: "java"
    }

  ];



  selectedCategory = "All";



  filteredQuizzes = this.quizzes;



  displayQuizzes() {

    if (this.selectedCategory === "All") {

      this.filteredQuizzes = this.quizzes;

    } else {

      this.filteredQuizzes = this.quizzes.filter(
        quiz => quiz.category === this.selectedCategory
      );

    }

  }

  selectCategory(category: string) {

    this.selectedCategory = category;

    this.displayQuizzes();

  }

}

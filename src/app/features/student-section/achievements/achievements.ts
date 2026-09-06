import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

interface Achievement {
  title: string;
  finishedDate: string;
  logo: string;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.css']
})
export class AchievementsComponent {
  achievements: Achievement[] = [
    { title: 'HTML COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { title: 'CSS COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { title: 'Javascript COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { title: 'C++ COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { title: 'React COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { title: 'Python COURSES', finishedDate: 'Finished 8/3/2026', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
  ];
}

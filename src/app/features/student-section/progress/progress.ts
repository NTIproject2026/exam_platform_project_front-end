import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {}



import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';
import { SearchHeader } from '../../../shared/search.header/search.header';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,SearchHeader

  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}

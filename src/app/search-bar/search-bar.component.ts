import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  search(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
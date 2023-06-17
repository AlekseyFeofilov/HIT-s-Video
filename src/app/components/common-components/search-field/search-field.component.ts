import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent {
  @Output() searchEvent = new EventEmitter<string>();
  protected searchText = "";

  search() {
    this.searchEvent.emit(this.searchText);
  }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {Tag} from "../../../domain/models/tag/tag";

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {
  @Output() addNewValueEvent = new EventEmitter<string>();
  protected valueName: string = "";

  addValue() {
    this.addNewValueEvent.emit(this.valueName);
  }
}

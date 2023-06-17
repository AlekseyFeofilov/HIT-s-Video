import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HashHelper} from "../../../helpers/hash/hash-helper";
import {Tag} from "../../../domain/models/tag/tag";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent {
  @Input() tags: Tag[] = [];
  protected readonly HashHelper = HashHelper;
}

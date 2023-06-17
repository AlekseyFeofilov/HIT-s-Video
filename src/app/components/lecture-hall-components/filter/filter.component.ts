import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../../domain/models/tag/tag";
import {Group} from "../../../domain/models/group/group";
import {HashHelper} from "../../../helpers/hash/hash-helper";
import {Subject} from "../../../domain/models/subject/subject";
import {SearchTagDto} from "../../../domain/dtos/tag/searchTagDto";
import {TagDto} from "../../../domain/dtos/tag/tagDto";
import {PageDtoTagDto} from "../../../domain/dtos/tag/pageDtoTagDto";
import {TagMapper} from "../../../helpers/mappers/tagMapper";
import {SubjectAbstractService} from "../../../services/subject/subject.abstract.service";
import {TagAbstractService} from "../../../services/tag/tag.abstract.service";
import {SearchSubjectDto} from "../../../domain/dtos/subject/searchSubjectDto";
import {SubjectMapper} from "../../../helpers/mappers/subjectMapper";
import {filter} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() groupId: string = "";
  @Output() applyFilterEvent = new EventEmitter<{ tagFilter: Tag[], subjectFilter: string[] }>();

  protected tags: Tag[] = [];
  protected tagFilter: Tag[] = [];

  protected subjects: Subject[] = [];
  protected subjectFilter: Subject[] = [];

  constructor(private readonly tagService: TagAbstractService,
              private readonly subjectService: SubjectAbstractService
  ) {
  }

  ngOnInit(): void {
    let searchTag = new SearchTagDto("");
    this.tagService.getTags(searchTag, this.groupId).subscribe({
      next: (tags: PageDtoTagDto) => {
        this.tags = tags.content.map(TagMapper.TagDtoToTag);
        console.log(tags)
        this.tagFilter = this.tags.map(x => new Tag(x.id, x.name, []));
      }
    });

    let searchSubject = new SearchSubjectDto("")
    this.subjectService.getSubjects(searchSubject, this.groupId).subscribe({
      next: subjects => {
        this.subjects = subjects.content.map(SubjectMapper.subjectDtoToSubject)
      }
    })
  }

  changeTagValueStatus(tag: Tag, tagValue: string) {
    let tagValues = this.tagFilter.find(x => x.id === tag.id)!;

    if (tagValues.values.includes(tagValue)) {
      tagValues.values = tagValues.values.filter(x => x !== tagValue);
    } else {
      tagValues.values.push(tagValue);
    }
  }

  changeSubjectStatus(subject: Subject) {
    if (this.subjectFilter.some(x => x.id === subject.id)) {
      this.subjectFilter = this.subjectFilter.filter(x => x.id !== subject.id);
    } else {
      this.subjectFilter.push(subject);
    }
  }

  applyFilters() {
    this.applyFilterEvent.emit({
      tagFilter: this.tagFilter,
      subjectFilter: this.subjectFilter.map(x => x.id)
    })
  }
}

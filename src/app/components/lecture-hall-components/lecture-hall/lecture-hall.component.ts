import {Component, OnInit} from '@angular/core';
import {Group} from "../../../domain/models/group/group";
import {ActivatedRoute} from "@angular/router";
import {Tag} from "../../../domain/models/tag/tag";

@Component({
  selector: 'app-lecture-hall',
  templateUrl: './lecture-hall.component.html',
  styleUrls: ['./lecture-hall.component.css']
})
export class LectureHallComponent implements OnInit {
  protected group: Group | null = null;
  protected tagFilter: Tag[] = [];
  protected subjectFilter: string[] = [];

  // protected group: Group | null = null;

  constructor(route: ActivatedRoute,) {
    route.queryParams.subscribe(params => {
        if (params['jwt'] !== undefined) {
          localStorage.setItem('jwt', params['jwt']);
        }
      }
    );
  }

  setGroupVideos(group: Group) {
    this.group = group;
  }

  ngOnInit(): void {

  }

  applyFilter($event: { tagFilter: Tag[]; subjectFilter: string[] }) {
    this.tagFilter = $event.tagFilter;
    this.subjectFilter = $event.subjectFilter
  }
}

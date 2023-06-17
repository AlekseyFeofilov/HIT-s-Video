import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {VideoCreate} from "../../../domain/models/video/videoCreate";
import {Group} from "../../../domain/models/group/group";
import {Tag} from "../../../domain/models/tag/tag";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";
import {TagAbstractService} from "../../../services/tag/tag.abstract.service";
import {SearchGroupDto} from "../../../domain/dtos/group/searchGroupDto";
import {GroupMapper} from "../../../helpers/mappers/groupMapper";
import {SearchTagDto} from "../../../domain/dtos/tag/searchTagDto";
import {TagMapper} from "../../../helpers/mappers/tagMapper";
import {VideoAbstractService} from "../../../services/video/video.abstract.service";
import {VideoMapper} from "../../../helpers/mappers/videoMapper";
import {Subject} from "../../../domain/models/subject/subject";
import {SubjectService} from "../../../services/subject/subject.service";
import {SearchSubjectDto} from "../../../domain/dtos/subject/searchSubjectDto";
import {SubjectMapper} from "../../../helpers/mappers/subjectMapper";
import {SubjectAbstractService} from "../../../services/subject/subject.abstract.service";
import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
  protected videoCreate = new VideoCreate()
  protected groups: Group[] = []

  protected tags: Tag[] = [];
  protected tagFilter: Tag[] = [];
  protected subjects: Subject[] = [];

  // protected tagValues: TagValue[] = [];

  constructor(private readonly groupService: GroupAbstractService,
              private readonly tagService: TagAbstractService,
              private readonly videoService: VideoAbstractService,
              private readonly subjectService: SubjectAbstractService,
              private readonly httpClient: HttpClient,
              private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    let searchGroup = new SearchGroupDto("");
    this.groupService.getGroups(searchGroup).subscribe({
      next: groups => {
        this.groups = groups.content.map(GroupMapper.groupDtoToGroup);
      }
    });
  }

  createVideo() {
    console.log(typeof this.videoCreate.recordingDateTime == typeof new Date())
  }

  onSubmit() {
    this.videoCreate.tags = this.tagFilter;
    let creationVideo = VideoMapper.VideoCreateToCreationVideoDto(this.videoCreate);
    let formData = new FormData()
    let headers = new HttpHeaders();
    headers.set("Content-Type", "multipart/form-data")
    formData.append("video_file", this.videoCreate.videoFile!);

    console.log(creationVideo)

    this.videoService.createGroupVideo(creationVideo, this.videoCreate.groupId).subscribe({
      next: uploadVideo => {
        this.httpClient.post(uploadVideo.uploadUrl, formData, {headers: headers}).subscribe({
          next: _ => {
            this.router.navigate([''])
          }
        });
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

  setGroup() {
    let searchTag = new SearchTagDto("");
    this.tagService.getTags(searchTag, this.videoCreate.groupId).subscribe({
      next: tags => {
        this.tags = tags.content.map(TagMapper.TagDtoToTag);
        this.tagFilter = this.tags.map(x => new Tag(x.id, x.name, []));
      }
    });

    let searchSubject = new SearchSubjectDto("");
    this.subjectService.getSubjects(searchSubject, this.videoCreate.groupId).subscribe({
      next: subjects => {
        this.subjects = subjects.content.map(SubjectMapper.subjectDtoToSubject);
      }
    });
  }

  onFileChange($event: any){
    let file = $event.target.files[0];
    this.videoCreate.videoFile = file;
    console.log(file);
  }

  addTagValue(tag: Tag, $event: string) {
    this.tags.find(x => x.id === tag.id)!.values.push($event);
  }

  addTag($event: string) {
    this.tags.push(new Tag("", $event, []));
    this.tagFilter.push(new Tag("", $event, []));
  }
}

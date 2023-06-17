import {Component, OnInit, Input, SimpleChanges, OnChanges} from "@angular/core";
import {HashHelper} from "../../../helpers/hash/hash-helper";
import {TrustResourceUrlService} from "../../../services/trust-resource-url/trust-resource-url.service";
import {Group} from "../../../domain/models/group/group";
import {group} from "@angular/animations";
import {Video} from "../../../domain/models/video/video";
import {SearchVideoDto} from "../../../domain/dtos/video/searchVideoDto";
import {UsingTagDto} from "../../../domain/dtos/tag/usingTagDto";
import {Tag} from "../../../domain/models/tag/tag";
import {PageDtoVideoDto} from "../../../domain/dtos/video/pageDtoVideoDto";
import {VideoMapper} from "../../../helpers/mappers/videoMapper";
import {VideoAbstractService} from "../../../services/video/video.abstract.service";


@Component({
  selector: 'app-video-wall',
  templateUrl: './video-wall.component.html',
  styleUrls: ['./video-wall.component.css']
})
export class VideoWallComponent implements OnChanges {
  @Input() group: Group | null = null;
  @Input() tagFilter: Tag[] = [];
  @Input() subjectFilter: string[] = [];

  protected videos: Video[] = [];
  protected textFilter = "";

  constructor(protected readonly TrustResourceUrlService: TrustResourceUrlService,
              private readonly videoService: VideoAbstractService,
  ) {
  }

  private searchVideos() {
    let usingTagDto = this.tagFilter
      .map(tag => new UsingTagDto(tag.name, tag.values))
      .filter(x => x.values.length !== 0);
    let searchVideoDto = new SearchVideoDto(this.textFilter, this.subjectFilter, usingTagDto);

    this.videoService.getGroupVideos(searchVideoDto, this.group!.id).subscribe({
      next: (videos: PageDtoVideoDto) => {
        this.videos = videos.content.map(video => VideoMapper.VideoDtoToVideo(video, this.group!));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.group === null) {
      this.videos = [];
      return
    }

    this.searchVideos();
  }

  searchGroup(textFilter: string) {
    this.textFilter = textFilter;
    this.searchVideos();
  }
}

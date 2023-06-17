import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Video} from "../../../domain/models/video/video";
import {DomSanitizer} from "@angular/platform-browser";
import {HashHelper} from "../../../helpers/hash/hash-helper";
import {TrustResourceUrlService} from "../../../services/trust-resource-url/trust-resource-url.service";
import {SubtitlesService} from "../../../services/subtitles/subtitles.service";
import {VideoDto} from "../../../domain/dtos/video/videoDto";
import {VideoMapper} from "../../../helpers/mappers/videoMapper";
import {Group} from "../../../domain/models/group/group";
import {VideoAbstractService} from "../../../services/video/video.abstract.service";
import {SubtitlesAbstractService} from "../../../services/subtitles/subtitles.abstract.service";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  protected video: Video | undefined;
  protected subtitles: string = "";
  private readonly videoId: string;

  constructor(protected readonly TrustResourceUrlService: TrustResourceUrlService,
              private readonly videoService: VideoAbstractService,
              private readonly subtitlesService: SubtitlesAbstractService,
              private readonly route: ActivatedRoute,
  ) {
    this.videoId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.videoService.getVideo(this.videoId).subscribe({
      next: (video: VideoDto) => {
        this.video = VideoMapper.VideoDtoToVideo(video, new Group("", "Todo: внести группу в VideoDto", []));//todo внести группу в VideoDto
      }
    });
  }
}

import {Component, Input} from '@angular/core';
import {TrustResourceUrlService} from "../../../services/trust-resource-url/trust-resource-url.service";

@Component({
  selector: 'app-vk-video-widget',
  templateUrl: './vk-video-widget.component.html',
  styleUrls: ['./vk-video-widget.component.css']
})
export class VkVideoWidgetComponent {
  @Input() url: URL | undefined;

  constructor(protected readonly TrustResourceUrlService: TrustResourceUrlService) {
  }
}

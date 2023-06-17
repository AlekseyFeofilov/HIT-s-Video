import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TrustResourceUrlService {
  constructor(private sanitizer: DomSanitizer) {
  }

  getUrl(url: URL) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString())
  }
}

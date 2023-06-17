import {Component, OnInit} from '@angular/core';
import {OAUTH_URL} from "../../../../constants/app.constants";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  protected url = OAUTH_URL;
}

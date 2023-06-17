import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app/components/app-components/app/app.component';
import {SidebarComponent} from './app/components/lecture-hall-components/sidebar/sidebar.component';
import {VideoWallComponent} from './app/components/lecture-hall-components/video-wall/video-wall.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";
import {FilterComponent} from './app/components/lecture-hall-components/filter/filter.component';
import {VideoDetailsComponent} from './app/components/video-details-components/video-details/video-details.component';
import {provideRouter, RouterModule, Routes} from "@angular/router";
import routeConfig from "./routes";
import {LectureHallComponent} from './app/components/lecture-hall-components/lecture-hall/lecture-hall.component';
import {AddVideoComponent} from './app/components/add-video-components/add-video/add-video.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TagListComponent} from './app/components/common-components/tag-list/tag-list.component';
import {VkVideoWidgetComponent} from './app/components/common-components/vk-video-widget/vk-video-widget.component';
import {NgbAlert, NgbDatepicker, NgbInputDatepicker, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchFieldComponent} from './app/components/common-components/search-field/search-field.component';
import {AuthorizationComponent} from './app/components/authorization-component/authorization/authorization.component';
import {ErrorHandlerMiddleware} from "./app/middlewares/error/error-handler.middleware";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateGroupComponent } from './app/components/group-components/create-group/create-group.component';
import {TokenInterceptorService} from "./app/middlewares/token-interceptor/token-interceptor.service";
import { CreateSubjectComponent } from './app/components/create-subject-components/create-subject/create-subject.component';
import {GroupAbstractService} from "./app/services/group/group.abstract.service";
import {GroupService} from "./app/services/group/group.service";
import {SubjectAbstractService} from "./app/services/subject/subject.abstract.service";
import {SubjectService} from "./app/services/subject/subject.service";
import {TagAbstractService} from "./app/services/tag/tag.abstract.service";
import {TagService} from "./app/services/tag/tag.service";
import {VideoAbstractService} from "./app/services/video/video.abstract.service";
import {VideoService} from "./app/services/video/video.service";
import { GroupsComponent } from './app/components/group-components/groups/groups.component';
import { GroupDetailsComponent } from './app/components/group-components/group-details/group-details.component';
import { GroupEditComponent } from './app/components/group-components/group-edit/group-edit.component';
import {UserAbstractService} from "./app/services/user/user.abstract.service";
import {UserService} from "./app/services/user/user.service";
import {SubtitlesService} from "./app/services/subtitles/subtitles.service";
import {SubtitlesAbstractService} from "./app/services/subtitles/subtitles.abstract.service";
import { AddTagComponent } from './app/components/add-video-components/add-tag/add-tag.component';

// import '~hamburgers/_sass/hamburgers/hamburgers.scss';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    VideoWallComponent,
    FilterComponent,
    VideoDetailsComponent,
    AddVideoComponent,
    TagListComponent,
    VkVideoWidgetComponent,
    LectureHallComponent,
    SearchFieldComponent,
    AuthorizationComponent,
    CreateGroupComponent,
    CreateSubjectComponent,
    GroupsComponent,
    GroupDetailsComponent,
    GroupEditComponent,
    AddTagComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig),
    NgOptimizedImage,
    NgbInputDatepicker,
    NgbAlert,
    NgbDatepicker,
    NgbModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideRouter(routeConfig),
    {provide: ErrorHandler, useClass: ErrorHandlerMiddleware},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: GroupAbstractService, useClass: GroupService},
    {provide: SubjectAbstractService, useClass: SubjectService},
    {provide: TagAbstractService, useClass: TagService},
    {provide: VideoAbstractService, useClass: VideoService},
    {provide: UserAbstractService, useClass: UserService},
    {provide: SubtitlesAbstractService, useClass: SubtitlesService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

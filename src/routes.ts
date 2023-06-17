import {Routes} from "@angular/router";
import {AppComponent} from "./app/components/app-components/app/app.component";
import {VideoDetailsComponent} from "./app/components/video-details-components/video-details/video-details.component";
import {LectureHallComponent} from "./app/components/lecture-hall-components/lecture-hall/lecture-hall.component";
import {AddVideoComponent} from "./app/components/add-video-components/add-video/add-video.component";
import {AuthorizationComponent} from "./app/components/authorization-component/authorization/authorization.component";
import {CreateGroupComponent} from "./app/components/group-components/create-group/create-group.component";
import {
  CreateSubjectComponent
} from "./app/components/create-subject-components/create-subject/create-subject.component";
import {GroupsComponent} from "./app/components/group-components/groups/groups.component";
import {GroupDetailsComponent} from "./app/components/group-components/group-details/group-details.component";
import {GroupEditComponent} from "./app/components/group-components/group-edit/group-edit.component";

const routeConfig: Routes = [
  {
    path: '',
    component: LectureHallComponent,
    title: 'Home page'
  },
  {
    path: 'video/:id',
    component: VideoDetailsComponent,
    title: 'Video details'
  },
  {
    path: 'video',
    component: AddVideoComponent,
    title: 'Add video'
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
    title: 'Authorize'
  },
  {
    path: 'group',
    component: GroupsComponent,
    title: 'Groups'
  },
  {
    path: 'group/new',
    component: CreateGroupComponent,
    title: 'Create group'
  },
  {
    path: 'group/:id',
    component: GroupDetailsComponent,
    title: 'Group details'
  },
  {
    path: 'group/edit/:id',
    component: GroupEditComponent,
    title: 'Edit group'
  },
  {
    path: 'subject',
    component: CreateSubjectComponent,
    title: 'Create subject'
  }
];

export default routeConfig;

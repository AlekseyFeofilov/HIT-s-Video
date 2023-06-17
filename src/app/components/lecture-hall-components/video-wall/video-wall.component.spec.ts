import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWallComponent } from './video-wall.component';

describe('VideoWallComponent', () => {
  let component: VideoWallComponent;
  let fixture: ComponentFixture<VideoWallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoWallComponent]
    });
    fixture = TestBed.createComponent(VideoWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

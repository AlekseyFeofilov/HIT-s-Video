import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VkVideoWidgetComponent } from './vk-video-widget.component';

describe('VkVideoWidgetComponent', () => {
  let component: VkVideoWidgetComponent;
  let fixture: ComponentFixture<VkVideoWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VkVideoWidgetComponent]
    });
    fixture = TestBed.createComponent(VkVideoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

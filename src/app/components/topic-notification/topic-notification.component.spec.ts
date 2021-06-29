import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNotificationComponent } from './topic-notification.component';

describe('TopicNotificationComponent', () => {
  let component: TopicNotificationComponent;
  let fixture: ComponentFixture<TopicNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNotificationListComponent } from './topic-notification-list.component';

describe('TopicNotificationListComponent', () => {
  let component: TopicNotificationListComponent;
  let fixture: ComponentFixture<TopicNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

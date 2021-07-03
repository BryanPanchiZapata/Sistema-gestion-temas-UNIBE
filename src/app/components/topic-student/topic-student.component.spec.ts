import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicStudentComponent } from './topic-student.component';

describe('TopicStudentComponent', () => {
  let component: TopicStudentComponent;
  let fixture: ComponentFixture<TopicStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

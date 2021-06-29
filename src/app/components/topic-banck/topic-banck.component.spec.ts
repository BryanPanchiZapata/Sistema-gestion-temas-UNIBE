import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicBanckComponent } from './topic-banck.component';

describe('TopicBanckComponent', () => {
  let component: TopicBanckComponent;
  let fixture: ComponentFixture<TopicBanckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicBanckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicBanckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

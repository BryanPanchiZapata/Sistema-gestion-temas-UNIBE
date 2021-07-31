import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicProposalReadComponent } from './topic-proposal-read.component';

describe('TopicProposalReadComponent', () => {
  let component: TopicProposalReadComponent;
  let fixture: ComponentFixture<TopicProposalReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicProposalReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicProposalReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnswersComponent } from './survey-answers.component';

describe('SurveyAnswersComponent', () => {
  let component: SurveyAnswersComponent;
  let fixture: ComponentFixture<SurveyAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyAnswersComponent]
    });
    fixture = TestBed.createComponent(SurveyAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

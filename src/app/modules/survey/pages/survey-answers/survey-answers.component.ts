import { Component, OnInit } from '@angular/core';
import { QuestionAnswer } from 'src/app/interfaces/question';
import { SurveyService } from '../../services/survey.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-answers',
  templateUrl: './survey-answers.component.html',
  styleUrls: ['./survey-answers.component.scss']
})
export class SurveyAnswersComponent implements OnInit {

  loading: boolean = false;
  questionAnswers!: QuestionAnswer[];

  constructor(
    private _survey: SurveyService,
    private _notification: NzNotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getQuestionAnswers();
  }
  getQuestionAnswers() {
    this.loading = true;
    this._survey.getQuestionAnswers().subscribe((questionAnswers) => {
      if (!questionAnswers) {
        this._notification.error("Error", "No data, please create a survey first.", {
          nzPlacement: 'bottomRight'
        });
        this._router.navigate(['/survey', 'builder']);
      } else {
        this.questionAnswers = questionAnswers;
      }
    }).add(() => {
      this.loading = false;
    });
  }
}

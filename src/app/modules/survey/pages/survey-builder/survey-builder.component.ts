import { FormArray } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { SurveyService } from '../../services/survey.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { QuestionFormComponent } from 'src/app/modules/question/components/question-form/question-form.component';
import { QuestionViewComponent } from 'src/app/modules/question/components/question-view/question-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss']
})
export class SurveyBuilderComponent implements OnInit {
  @ViewChildren('questionViews') questionViews!: QueryList<QuestionViewComponent>;

  loading: boolean = false;
  questions!: Question[];
  modalRef!: NzModalRef;
  submitting: boolean = false;


  constructor(private _survey: SurveyService, private _modal: NzModalService, private cdf: ChangeDetectorRef, private _router: Router) {

  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.loading = true;
    this._survey.getQuestions().subscribe((questions) => {
      this.questions = questions;
    }).add(() => {
      this.loading = false;
    });
  }

  addNewQuestion() {
    this.modalRef = this._modal.create({
      nzTitle: "Add new question",
      nzContent: QuestionFormComponent,
      nzCentered: true,
      nzCancelText: "Cancel",
      nzOkText: "Submit",
      nzOnOk: (component: QuestionFormComponent) => {
        this.modalRef.updateConfig({ nzOkLoading: true });
        const data = component.formGroup.value;
        this._survey.addQuestion(data).subscribe(() => {
          this.getQuestions();
          this.modalRef.close();
        }).add(() => {
          this.modalRef.updateConfig({ nzOkLoading: false })
        })
        return false;
      }
    })
  }

  reviewAnswers() {

    const isInvalid: boolean = this.questionViews.map((questionView) => {
      questionView.formGroup.markAllAsTouched();
      return questionView.formGroup.invalid;
    }).filter((invalid) => invalid).length > 0;

    if (isInvalid) return;

    this.submitting = true;
    const questionAnswers: any = [];
    this.questionViews.forEach((questionView) => {
      questionAnswers.push(questionView.formGroup.value);
    })

    this._survey.saveAnswers(questionAnswers).subscribe((res) => {
      this._router.navigate(['/form', 'answers']);
    }).add(() => {
      this.submitting = false;
    })
  }
}

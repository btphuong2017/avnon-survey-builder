import { Component, Input } from '@angular/core';
import { QuestionType } from 'src/app/enums/question';
import { QuestionAnswer } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.scss']
})
export class QuestionResultComponent {
  @Input() index!: number;
  @Input() questionAnswer!: QuestionAnswer;

  get isCheckbox(): boolean {
    return this.questionAnswer.questionType === QuestionType.Checkbox;
  }
  get selectedAnswers() {
    return this.questionAnswer.answers.filter((answer) => answer.checked);
  }
}

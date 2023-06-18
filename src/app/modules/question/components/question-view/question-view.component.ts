import { FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { QuestionType } from 'src/app/enums/question';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  @Input() index!: number;
  @Input() question!: Question;
  formGroup!: FormGroup;

  get isCheckbox() {
    return this.question.type === QuestionType.Checkbox;
  }

  get answers() {
    return (this.formGroup.get('answers') as FormArray).controls;
  }

  get result() {
    return this.formGroup.value;
  }

  constructor(public cdf: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      questionId: new FormControl(this.question.id),
      questionType: new FormControl(this.question.type),
      questionText: new FormControl(this.question.question),
      answer: new FormControl('', this.question.type === QuestionType.Paragraph && this.question.required ? [Validators.required] : []),
      answers: new FormArray(this.question.answers.map((answer) => {
        return new FormGroup({
          id: new FormControl(answer.id),
          answer: new FormControl(answer.answer),
          checked: new FormControl(false)
        })
      }), this.question.type === QuestionType.Checkbox && this.question.required ? [this.checkBoxAnswerValidator.bind(this)] : []),
      other: new FormControl(false, this.question.required ? [Validators.required] : []),
    });

    this.formGroup.get('other')?.valueChanges.subscribe((value) => {
      if (value && this.question.required) {
        this.formGroup.get('answer')?.setValidators([Validators.required]);
        this.formGroup.get('answer')?.markAsUntouched();
      } else {
        this.formGroup.get('answer')?.clearValidators();
      }
      this.formGroup.get('answers')?.updateValueAndValidity();
      this.formGroup.get('answer')?.updateValueAndValidity();
    })
  }

  checkBoxAnswerValidator(control: AbstractControl) {
    if (this.formGroup) {
      const answers = (control as FormArray).controls;
      const checkedAnswers = answers.filter((answer) => answer.get('checked')?.value);
      if (checkedAnswers.length === 0 && !this.formGroup.get('other')?.value) {
        return { required: true };
      }
    }
    return null;
  }

}

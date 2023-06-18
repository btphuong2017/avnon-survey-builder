import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuestionType } from 'src/app/enums/question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  formGroup!: FormGroup;
  loading: boolean = false;

  get questionType(): QuestionType {
    return this.formGroup.get('type')?.value || QuestionType.Paragraph;
  }

  get isCheckboxList(): boolean {
    return this.questionType === QuestionType.Checkbox;
  }

  get answers(): AbstractControl<any, any>[] {
    return (this.formGroup.get('answers') as FormArray).controls;
  }

  constructor(private modalRef: NzModalRef, private _notify: NzNotificationService){}

  ngOnInit(): void {
   
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      type: new FormControl(QuestionType.Paragraph, [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answers: new FormArray([]),
      required: new FormControl(false),
      canSpecify: new FormControl(false),
    });
    this.formGroup.get('type')?.valueChanges.subscribe((value) => {
      if (value === QuestionType.Paragraph) {
        this.clearAnswers();
      } else {
        this.initAnswers();
      }
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.modalRef.updateConfig({
        nzOkDisabled: this.formGroup.invalid
      })
    });

    this.formGroup.updateValueAndValidity();

  }

  initAnswers() {
    this.formGroup.setControl('answers', new FormArray([
      new FormGroup({
        id: new FormControl(1),
        answer: new FormControl('', [Validators.required]),
      })
    ]));
    this.formGroup.get('answers')?.setValidators([Validators.required]);
  }

  clearAnswers() {
    this.formGroup.setControl('answers', new FormArray([]));
    this.formGroup.get('answers')?.clearValidators();
  }

  addAnswer() {
    if((this.formGroup.get('answers') as FormArray).controls.length >= 5) {
      this._notify.error('Error', 'You can only add up to 5 answers', {
        nzPlacement: 'bottomRight'
      });
      return;
    }
    (this.formGroup.get('answers') as FormArray).push(new FormGroup({
      id: new FormControl(this.formGroup.get('answers')?.value.length + 1),
      answer: new FormControl('', [Validators.required]),
    }))
  }

  onSubmit() {
    if(this.formGroup.invalid) return;
    
    this.modalRef.triggerOk();
    return false;
  }



}

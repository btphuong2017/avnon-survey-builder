import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { QuestionType } from 'src/app/enums/question';
import { Question, QuestionAnswer, QuestionCheckboxAnswer } from 'src/app/interfaces/question';

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private storedQuestions: Question[] = [
    // {
    //   id: 1,
    //   type: QuestionType.Paragraph,
    //   question: 'What is your name?',
    //   required: true,
    //   canSpecify: false,
    //   answers: []
    // },
    // {
    //   id: 2,
    //   type: QuestionType.Checkbox,
    //   question: 'What is your favorite color?',
    //   required: true,
    //   canSpecify: true,
    //   answers: [
    //     {
    //       id: 1,
    //       answer: 'Red',
    //     },
    //     {
    //       id: 2,
    //       answer: 'Green',
    //     },
    //   ]
    // }
  ];

  private storedQuestionAnswers: QuestionAnswer[] | null = null;

  getQuestions(): Observable<Question[]> {
    return of(this.storedQuestions).pipe(delay(randomDelay()));
  }

  addQuestion(params: any) {
    const question: Question = params;
    question.id = this.storedQuestions.length + 1;
    this.storedQuestions.push(question);
    return of(true).pipe(delay(randomDelay()));
  }

  saveAnswers(questionAnswers: QuestionAnswer[]){
    this.storedQuestionAnswers = questionAnswers;
    return of(true).pipe(delay(randomDelay()));
  }

  getQuestionAnswers(): Observable<QuestionAnswer[] | null> {
    return of(this.storedQuestionAnswers).pipe(delay(randomDelay()));
  }
}

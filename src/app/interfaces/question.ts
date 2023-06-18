import { QuestionType } from "../enums/question";

export interface Question {
  id: number;
  type: QuestionType,
  question: string;
  answers: QuestionCheckboxAnswer[];
  canSpecify?: boolean;
  required?: boolean;
}

export interface QuestionCheckboxAnswer {
  id: number;
  answer: string;
}

export interface QuestionAnswer {
  questionId: number;
  questionType: QuestionType;
  questionText: string;
  answer: string;
  answers: Array<QuestionCheckboxAnswer & {
    checked: boolean;
  }>;
}

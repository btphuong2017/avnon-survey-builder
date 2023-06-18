# AvnonSurvey

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Requirement
Create a basic form builder which allows the user to add questions, answer the questions and then view
their answers on a ‘Review my answers’ page.
Initially the page will be empty with one button, ‘Add Question’. When they click that button display a
modal where they can input their question and choose the answer format, i.e. Paragraph answer or
Check Box list (multiple choice).
If the user selects Check Box list then they will be able to add up to 5 answer options as well as an
‘Other’ option which will display a text box when checked so the user can type in their own answer.
Admin should also be able to specify if a field is required or not and there should be basic validation on
the Question Add modal too.
Once they’ve filled in the form they’ll click ‘Review My Answers’ which will route them to Form-Review
and list their answers on labels.

## How to run

Clone the project
```
git clone git@github.com:btphuong2017/avnon-survey-builder.git
```
Install node module packages
```
npm install
```
Run dev server
```
ng serve
```

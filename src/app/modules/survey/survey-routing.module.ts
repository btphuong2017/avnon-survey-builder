import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { SurveyBuilderComponent } from './pages/survey-builder/survey-builder.component';
import { SurveyAnswersComponent } from './pages/survey-answers/survey-answers.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    children: [
      {
        path: 'builder',
        component: SurveyBuilderComponent
      },
      {
        path: 'answers',
        component: SurveyAnswersComponent
      },
      {
        path: "**",
        redirectTo: "builder"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }

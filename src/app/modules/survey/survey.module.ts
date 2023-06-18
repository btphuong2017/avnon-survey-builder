import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { QuestionModule } from '../question/question.module';
import { SurveyComponent } from './survey.component';
import { SurveyBuilderComponent } from './pages/survey-builder/survey-builder.component';
import { SurveyAnswersComponent } from './pages/survey-answers/survey-answers.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RightOutline } from '@ant-design/icons-angular/icons';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyBuilderComponent,
    SurveyAnswersComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    QuestionModule,
    NzCardModule,
    NzSpinModule,
    NzGridModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule.forChild([
      RightOutline
    ]),
    NzNotificationModule
  ]
})
export class SurveyModule { }

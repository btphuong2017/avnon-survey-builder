import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionResultComponent,
    QuestionViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule.forChild([
      PlusOutline,
    ]),
    NzCheckboxModule,
    NzModalModule,
    NzNotificationModule
  ],
  exports: [
    QuestionFormComponent,
    QuestionResultComponent,
    QuestionViewComponent
  ]
})
export class QuestionModule { }

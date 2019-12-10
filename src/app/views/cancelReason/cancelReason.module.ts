import { NgModule } from '@angular/core';
import { CancelReasonComponent } from './cancelReason.component';
import { CommonModule } from '@angular/common';
import { CancelReasonRoutingModule } from './cancelReason-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [CancelReasonComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    CancelReasonRoutingModule,
  ]
})
export class CancelReasonModule { }

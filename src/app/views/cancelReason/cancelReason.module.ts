import { NgModule } from '@angular/core';
import { CancelReasonComponent } from './cancelReason.component';
import { CommonModule } from '@angular/common';
import { CancelReasonRoutingModule } from './cancelReason-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CancelReasonComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CancelReasonRoutingModule,
  ]
})
export class CancelReasonModule { }

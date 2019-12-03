import { NgModule } from '@angular/core';
import { CancelReasonFormComponent } from './cancelReason-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CancelReasonFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class CancelReasonFormModule { }

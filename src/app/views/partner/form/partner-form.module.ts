import { NgModule } from '@angular/core';
import { PartnerFormComponent } from './partner-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PartnerFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class PartnerFormModule { }

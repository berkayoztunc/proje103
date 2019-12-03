import { NgModule } from '@angular/core';
import { CurrencyFormComponent } from './currency-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CurrencyFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class CurrencyFormModule { }

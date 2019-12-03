import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProductFormModule { }

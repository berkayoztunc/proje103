import { NgModule } from '@angular/core';
import { ServiceTypeFormComponent } from './serviceType-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ServiceTypeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ServiceTypeFormModule { }

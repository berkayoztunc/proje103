import { NgModule } from '@angular/core';
import { ServiceTypeFormComponent } from './serviceType-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class ServiceTypeFormModule { }

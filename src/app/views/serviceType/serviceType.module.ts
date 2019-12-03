import { NgModule } from '@angular/core';
import { ServiceTypeComponent } from './serviceType.component';
import { CommonModule } from '@angular/common';
import { ServiceTypeRoutingModule } from './serviceType-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ServiceTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceTypeRoutingModule,
  ]
})
export class ServiceTypeModule { }

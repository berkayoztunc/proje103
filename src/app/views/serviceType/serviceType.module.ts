import { NgModule } from '@angular/core';
import { ServiceTypeComponent } from './serviceType.component';
import { CommonModule } from '@angular/common';
import { ServiceTypeRoutingModule } from './serviceType-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [ServiceTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ServiceTypeRoutingModule,
  ]
})
export class ServiceTypeModule { }

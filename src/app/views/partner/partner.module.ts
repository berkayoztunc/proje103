import { NgModule } from '@angular/core';
import { PartnerComponent } from './partner.component';
import { CommonModule } from '@angular/common';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerFormComponent } from './form/partner-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [PartnerComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PartnerRoutingModule,
    SharedModule
  ]
})
export class PartnerModule { }

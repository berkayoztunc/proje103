import { NgModule } from '@angular/core';
import { BenefitComponent } from './benefit.component';
import { CommonModule } from '@angular/common';
import { BenefitRoutingModule } from './benefit-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [BenefitComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BenefitRoutingModule,
  ]
})
export class BenefitModule { }

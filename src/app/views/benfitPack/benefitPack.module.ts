import { NgModule } from '@angular/core';
import { BenefitPackComponent } from './benefitPack.component';
import { CommonModule } from '@angular/common';
import { BenefitPackRoutingModule } from './benefitPack-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BenefitPackBenefitsComponent } from './banefits/benefitPack-benefit.component';



@NgModule({
  declarations: [BenefitPackComponent,BenefitPackBenefitsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BenefitPackRoutingModule,
  ]
})
export class BenefitPackModule { }

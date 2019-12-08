import { NgModule } from '@angular/core';
import { BenefitPackComponent } from './benefitPack.component';
import { CommonModule } from '@angular/common';
import { BenefitPackRoutingModule } from './benefitPack-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BenefitPackBenefitsComponent } from './banefits/benefitPack-benefit.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [BenefitPackComponent,BenefitPackBenefitsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    BenefitPackRoutingModule,
  ]
})
export class BenefitPackModule { }

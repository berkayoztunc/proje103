import { NgModule } from '@angular/core';
import { BenefitPackBenefitsComponent } from './benefitPack-benefit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [BenefitPackBenefitsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class BenefitPackBenetiftsModule { }

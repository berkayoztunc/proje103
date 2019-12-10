import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenefitPackComponent} from './benefitPack.component';
import { BenefitPackBenefitsComponent } from './banefits/benefitPack-benefit.component';
const routes: Routes = [
    { path: '', component: BenefitPackComponent},
    // { path: 'form', component :BenefitPackFormComponent },
    { path: 'benefit', component : BenefitPackBenefitsComponent },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class BenefitPackRoutingModule { }

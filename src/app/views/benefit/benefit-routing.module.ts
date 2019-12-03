import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenefitComponent} from './benefit.component';
import { BenefitFormComponent } from './form/benefit-form.component';
const routes: Routes = [
    { path: '', component: BenefitComponent},
    //{ path: 'form', component :BenefitFormComponent },    
   

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class BenefitRoutingModule { }
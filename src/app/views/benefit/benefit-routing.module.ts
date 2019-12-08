import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenefitComponent} from './benefit.component';
const routes: Routes = [
    { path: '', component: BenefitComponent},
   

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class BenefitRoutingModule { }
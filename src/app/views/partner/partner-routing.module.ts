import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerComponent} from './partner.component';
import { PartnerFormComponent } from './form/partner-form.component';
const routes: Routes = [
    { path: '', component: PartnerComponent},
    //{ path: 'form', component :PartnerFormComponent },    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class PartnerRoutingModule { }
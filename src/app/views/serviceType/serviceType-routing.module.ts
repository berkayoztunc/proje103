import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTypeComponent} from './serviceType.component';
const routes: Routes = [
    { path: '', component: ServiceTypeComponent},
    //{ path: 'form', component :ServiceTypeFormComponent },    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ServiceTypeRoutingModule { }
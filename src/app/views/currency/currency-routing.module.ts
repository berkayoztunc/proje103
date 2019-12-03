import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent} from './currency.component';
import { CurrencyFormComponent } from './form/currency-form.component';
const routes: Routes = [
    { path: '', component: CurrencyComponent},
    //{ path: 'form', component :CurrencyFormComponent },    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CurrencyRoutingModule { }
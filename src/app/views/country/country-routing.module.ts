import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent} from './country.component';
import { CityComponent } from './city/city.component';
const routes: Routes = [
    { path: '', component: CountryComponent},
    { path: 'city', component :CityComponent },    
    //{ path: 'form', component :CountryFormComponent },    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CountryRoutingModule { }
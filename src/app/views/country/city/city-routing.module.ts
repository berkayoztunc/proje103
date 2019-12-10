import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent} from './city.component';
const routes: Routes = [
    { path: '', component: CityComponent},
    // { path: 'form', component :CityFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CityRoutingModule { }

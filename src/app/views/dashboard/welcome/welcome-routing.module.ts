import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
const routes: Routes = [
    { path: '', component: WelcomeComponent},
    // { path: 'form', component :CurrencyFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class WelcomeRoutingModule { }

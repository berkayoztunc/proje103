import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyComponent } from './policy.component';
import { SearchComponent } from './search/search.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', component: PolicyComponent, children : [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchComponent},
    { path: 'overview', component: OverviewComponent},
  ]},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }

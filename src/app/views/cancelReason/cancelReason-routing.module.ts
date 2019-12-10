import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelReasonComponent} from './cancelReason.component';
const routes: Routes = [
    { path: '', component: CancelReasonComponent},
    // { path: 'form', component :CancelReasonFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CancelReasonRoutingModule { }

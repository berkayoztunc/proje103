import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditTypeComponent} from './auditType.component';
const routes: Routes = [
    { path: '', component: AuditTypeComponent},
    // { path: 'form', component :auditTypeFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AuditTypeRoutingModule { }

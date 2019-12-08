import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent} from './role.component';
import { RolePermissionSyncComponent } from './permission/role-permission-sync.component';
const routes: Routes = [
    { path: '', component: RoleComponent},
    //{ path: 'form', component :RoleFormComponent },    
    { path : 'permission' , component : RolePermissionSyncComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class RoleRoutingModule { }
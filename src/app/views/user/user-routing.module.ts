import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
const routes: Routes = [
    { path: '', component: UserComponent },
    //{ path: 'form', component: UserFormComponent },
    //{ path: 'form/:USER_ID', component :UserFormComponent }



]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class UserRoutingModule { }
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserFormComponent } from './form/user-form.component';
const routes = [
    { path: '', component: UserComponent },
    //{ path: 'form', component :UserFormComponent },
    { path: 'form/:USER_ID', component: UserFormComponent }
];
let UserRoutingModule = class UserRoutingModule {
};
UserRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
        declarations: [],
    })
], UserRoutingModule);
export { UserRoutingModule };
//# sourceMappingURL=user-routing.module.js.map
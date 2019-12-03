import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './form/user-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    NgModule({
        declarations: [UserComponent, UserFormComponent],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            UserRoutingModule,
        ]
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map
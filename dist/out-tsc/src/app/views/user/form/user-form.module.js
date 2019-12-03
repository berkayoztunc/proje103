import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
let UserFormModule = class UserFormModule {
};
UserFormModule = tslib_1.__decorate([
    NgModule({
        declarations: [UserFormComponent],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule
        ]
    })
], UserFormModule);
export { UserFormModule };
//# sourceMappingURL=user-form.module.js.map
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
let UserFormComponent = class UserFormComponent {
    constructor(userService, fb, route, location) {
        this.userService = userService;
        this.fb = fb;
        this.route = route;
        this.location = location;
        this.edit = false;
        this.createForm();
    }
    createForm() {
        this.form = this.fb.group({
            USER_ID: [''],
            NAME: [''],
            EMAIL: [''],
            ACTIVE: ['']
        });
    }
    ngOnInit() {
        this.edit = this.route.snapshot.paramMap.get('USER_ID') == null;
        if (!this.edit) {
            const id = +this.route.snapshot.paramMap.get('USER_ID');
            this.userService.getUser(id).subscribe(user => {
                this.form.patchValue(user);
                console.log(this.form);
            });
        }
    }
    goBack() {
        this.location.back();
    }
    save() {
        if (!this.edit) {
            let hand = this.form.value;
            this.userService.updateUser(hand).subscribe(() => this.goBack());
        }
        else {
            this.userService.addUser(this.form.value).subscribe(() => this.goBack());
        }
    }
};
UserFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user',
        templateUrl: './user-form.component.html',
        styleUrls: ['./user-form.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, FormBuilder, ActivatedRoute, Location])
], UserFormComponent);
export { UserFormComponent };
//# sourceMappingURL=user-form.component.js.map
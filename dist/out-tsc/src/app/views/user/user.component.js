import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
let UserComponent = class UserComponent {
    constructor(userService) {
        this.userService = userService;
    }
    ngOnInit() {
        this.getHeroes();
    }
    getHeroes() {
        this.userService.getUseres()
            .subscribe(users => {
            this.users = users;
            console.log(this.users);
        });
    }
    delete(hero) {
        this.users = this.users.filter(h => h !== hero);
        this.userService.deleteUser(hero).subscribe();
    }
};
UserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UserService])
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map
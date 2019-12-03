import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let InMemoryDataService = class InMemoryDataService {
    createDb() {
        const users = [
            { USER_ID: 11, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
            { USER_ID: 12, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
            { USER_ID: 13, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
            { USER_ID: 14, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
            { USER_ID: 15, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
            { USER_ID: 16, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
        ];
        return { users };
    }
    genId(heroes) {
        return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.USER_ID)) + 1 : 1;
    }
};
InMemoryDataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], InMemoryDataService);
export { InMemoryDataService };
//# sourceMappingURL=in-memory-data.service.js.map
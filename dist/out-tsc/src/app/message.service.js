import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let MessageService = class MessageService {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
    clear() {
        this.messages = [];
    }
};
MessageService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map
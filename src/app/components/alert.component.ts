import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit {
    constructor(public request: RequestService) { }

    ngOnInit() {

    }
    ngOnDestroy() {
        this.request.error = null;
    }
}

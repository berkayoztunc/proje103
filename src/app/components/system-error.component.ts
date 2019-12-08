import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-system-error',
    templateUrl: './system-error.component.html'
})

export class SystemErrorComponent implements OnInit {
    code = false;
    data = [];
    constructor(public request : RequestService,private active : NgbActiveModal) { 
       
    }

    ngOnInit() {
        this.data =this.request.error;
    }
    close(){
        this.active.dismiss();
    }
    send(){

    }
    ngOnDestroy(){
        this.request.error = null
    }
}
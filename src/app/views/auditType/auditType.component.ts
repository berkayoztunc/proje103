import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditTypeFormComponent } from './form/auditType-form.component';

@Component({
  selector: 'app-auditType',
  templateUrl: './auditType.component.html',
  styleUrls: ['./auditType.component.css']
})
export class AuditTypeComponent implements OnInit {
  data = [];
  search = '';
  detail = false;
  tabelOnInit = true;
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal, public request: RequestService , public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.getData();
    }
  }
  
  select(item, index) {
    this.storage.auditType.selectedAuditType = {item, index};
    this.modalService.open(AuditTypeFormComponent);

  }
  getData(): void {
    this.request.get( 'api/audit-types' )
    .subscribe(response => {
      if (response) {
        this.data = this.storage.auditType.auditTypes = response.data;
      }
    });

  }
  

}

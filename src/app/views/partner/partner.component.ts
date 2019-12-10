import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/partner';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RequestService } from 'src/app/services/request.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerFormComponent } from './form/partner-form.component';

@Component({
  selector: 'app-Partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  data: Partner[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/partners';
  idFlag = 'PARTNER_ID';
  constructor( private modalService: NgbModal,
               public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.searchPartners();
    }
    this.data = this.storage.partner.partners;

  }
  searchClick() {
    this.storage.partner.partners.map((item) => {
      const check = item.PARTNER.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.partner.selectedPartner = {item, index};

    this.modalService.open(PartnerFormComponent);

  }
  create() {
    this.storage.partner.selectedPartner = null;
    this.modalService.open(PartnerFormComponent);
  }
  searchPartners(): void {
    this.request.get( this.url )
    .subscribe(response => {
      if (response) {
        this.data = this.storage.partner.partners= response.data.map((item) => {
          item.check = true;
          return item;
        });
      }
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url+'/' + item['PARTNER_ID']).subscribe(() => {
          this.storage.partner.partners.splice(i, 1);
          this.data = this.storage.partner.partners;
        });
      }
    });
  }

}

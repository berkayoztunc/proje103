import { Component, OnInit } from '@angular/core';
import { ServiceType } from 'src/app/models/serviceType';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypeFormComponent } from './form/serviceType-form.component';

@Component({
  selector: 'app-ServiceType',
  templateUrl: './serviceType.component.html',
  styleUrls: ['./serviceType.component.css']
})
export class ServiceTypeComponent implements OnInit {
  data = [];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/servicetypes';
  idFlag = 'SERVICE_TYPE_ID';
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal, public request: RequestService , public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.searchServiceTypes();
    }
    this.data = this.storage.serviceType.serviceTypes;

  }
  searchClick() {
    this.storage.serviceType.serviceTypes.map((item) => {
      const check = item.SERVICE_TYPE.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.serviceType.selectedServiceType = {item, index};
    this.modalService.open(ServiceTypeFormComponent);

  }
  create() {
    this.storage.serviceType.selectedServiceType = null;
    this.modalService.open(ServiceTypeFormComponent);

  }
  searchServiceTypes(): void {
    this.request.get( this.url)
    .subscribe(response => {
      if (response) {
        this.data = this.storage.serviceType.serviceTypes = response.data.map((item) => {
          item.check = true;
          return item;
        });;
      }
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url + '/' + item[this.idFlag]).subscribe(() => {
          this.storage.serviceType.serviceTypes.splice(i, 1);
          this.data = this.storage.benefit.benefits;
        });
      }
    });
  }

}

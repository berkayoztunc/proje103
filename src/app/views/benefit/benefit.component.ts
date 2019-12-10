import { Component, OnInit } from '@angular/core';
import { Benefit } from 'src/app/models/benefit';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RequestService } from 'src/app/services/request.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitFormComponent } from './form/benefit-form.component';

@Component({
  selector: 'app-Benefit',
  templateUrl: './Benefit.component.html',
  styleUrls: ['./Benefit.component.css']
})
export class BenefitComponent implements OnInit {
  data: Benefit[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/benefits';
  idFlag = 'BENEFIT_ID';
  formModalComponenet = BenefitFormComponent;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public request: RequestService,
    public storage: StoreService) {
  }




  ngOnInit() {

    if (this.tabelOnInit) {
      this.getData();
    }
    this.data = this.storage.benefit.benefits;
  }
  searchClick() {
    this.storage.benefit.benefits.map((item) => {
      const check = item.BENEFIT.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.benefit.selectedBenefit = { item, index };
    this.modalService.open(this.formModalComponenet);
  }
  create() {
    this.storage.benefit.selectedBenefit = null;
    this.modalService.open(this.formModalComponenet);
  }
  getData(): void {
    this.request.get(this.url)
      .subscribe(response => {
        if (response) {
          this.data = this.storage.benefit.benefits = response.data.map((item) => {
            item.check = true;
            return item;
          });
        }
      });
  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url + '/' + item[this.idFlag]).subscribe(() => {
          this.storage.benefit.benefits.splice(i, 1);
          this.data = this.storage.benefit.benefits;
        });
      }
    });
  }

}

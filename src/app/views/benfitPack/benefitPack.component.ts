import { Component, OnInit } from '@angular/core';
import { BenefitPack } from 'src/app/models/benefitPacks';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitPackFormComponent } from './form/benefitPack-form.component';

@Component({
  selector: 'app-BenefitPack',
  templateUrl: './BenefitPack.component.html',
  styleUrls: ['./BenefitPack.component.css']
})
export class BenefitPackComponent implements OnInit {
  data: BenefitPack[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/benefitpacks';
  idFlag = 'BENEFIT_PACK_ID';
  constructor( private modalService: NgbModal,
               public activeModal: NgbActiveModal, public request: RequestService , public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.getData();
    }
    this.data = this.storage.benefitPack.benefitPacks;

  }
  searchClick() {
    this.storage.benefitPack.benefitPacks.filter((item) => {
      const check = item.BENEFIT_PACK.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.benefitPack.selectedBenefitPack = {item, index};
    this.modalService.open(BenefitPackFormComponent);

  }
  viewBenefits(item) {
    this.storage.benefitPack.selectedBenefitPack = {item};
    this.route.navigate(['dashboard/benefitPack/benefit']);
  }
  create() {
    this.storage.benefitPack.selectedBenefitPack = null;
    // burda modal açılıcak
    this.modalService.open(BenefitPackFormComponent);

  }
  getData(): void {
    this.request.get(this.url )
    .subscribe(response => {
      if(response){
        this.data = this.storage.benefitPack.benefitPacks = response.data.map((item) => {
          item.check = true;
          return item;
        });
      }
      console.log(this.data);
      
    });
  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url + '/' + item[this.idFlag]).subscribe((response) => {
          if (response) {
            this.storage.benefitPack.benefitPacks.splice(i, 1);
            this.data = this.storage.benefitPack.benefitPacks;
          }

        });
      }
    });
  }

}

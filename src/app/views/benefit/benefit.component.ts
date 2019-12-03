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
  Benefits : Benefit[];
  Benefit : Benefit;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private request : RequestService,
    private storage : StoreService) {

  }

  ngOnInit()  {
    if(this.tabelOnInit){
      this.searchBenefits()
    }
    this.Benefits = this.storage.benefit.benefits
  }
  searchClick(){
    if(this.search != ''){
      this.Benefits = this.Benefits.filter((item) =>{
        return item.BENEFIT.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 
      });
    }else{
      this.Benefits = this.storage.benefit.benefits
    }
  }  
  select(item,index){
    this.storage.benefit.selectedBenefit = {item,index};
    this.modalService.open(BenefitFormComponent)
  }
  create(){
    this.storage.benefit.selectedBenefit = null;
    this.modalService.open(BenefitFormComponent)
  }
  searchBenefits(): void {
    this.request.get( 'api/benefits',{})
    .subscribe(response => {
      this.Benefits = this.storage.benefit.benefits = response.data
    });

  }
 
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/benefits/' + item.BENEFIT_ID).subscribe(() => {
          this.storage.benefit.benefits.splice(i, 1);
          this.Benefits = this.storage.benefit.benefits
        });
      }
    })
  }

}

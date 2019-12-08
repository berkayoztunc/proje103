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
  BenefitPacks : BenefitPack[];
  BenefitPack : BenefitPack;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor( private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService , public storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchBenefitPacks()
    }
    this.BenefitPacks = this.storage.benefitPack.benefitPacks;

  }
  searchClick(){
    if(this.search != ''){
      this.BenefitPacks = this.BenefitPacks.filter((item) =>{
        return item.BENEFIT_PACK.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 
      });
    }else{
      this.BenefitPacks = this.storage.benefitPack.benefitPacks;
    }
  }  
  select(item,index){
    this.storage.benefitPack.selectedBenefitPack = {item,index};
    this.modalService.open(BenefitPackFormComponent)

  }
  viewBenefits(item){
    this.storage.benefitPack.selectedBenefitPack = {item};

    this.route.navigate(['dashboard/benefitPack/benefit'])

  }
  delete2(){
   
  }
  create(){
    this.storage.benefitPack.selectedBenefitPack = null;
    // burda modal açılıcak
    this.modalService.open(BenefitPackFormComponent)

  }
  searchBenefitPacks(): void {
    this.request.get( 'api/benefitpacks' )
    .subscribe(response => {
      this.BenefitPacks = this.storage.benefitPack.benefitPacks = response.data
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/benefitpacks/' + item.BENEFIT_PACK_ID).subscribe((response) => {
          if(response){
            this.storage.benefitPack.benefitPacks.splice(i, 1);
            this.BenefitPacks = this.storage.benefitPack.benefitPacks
          }
         
        });
      }
    })
  }

}

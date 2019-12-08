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
  Partners : Partner[];
  Partner : Partner;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor( private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService,public storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchPartners()
    }
    this.Partners = this.storage.partner.partners;

  }
  searchClick(){
    if(this.search != ''){
      this.Partners = this.Partners.filter((item) =>{
        return item.PARTNER.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 
      });
    }else{
      this.Partners = this.storage.partner.partners;
    }
  }  
  select(item,index){
    this.storage.partner.selectedPartner = {item,index};
   
    this.modalService.open(PartnerFormComponent)

  }
  create(){
    this.storage.partner.selectedPartner = null;
    this.modalService.open(PartnerFormComponent)
  }
  searchPartners(): void {
    this.request.get( 'api/partners' )
    .subscribe(response => {
      this.Partners = this.storage.partner.partners = response.data
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/partners/' + item.PARTNER_ID).subscribe(() => {
          this.storage.partner.partners.splice(i, 1);
          this.Partners = this.storage.partner.partners
        });
      }
    })
  }

}

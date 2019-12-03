import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-BenefitPack-benefit',
  templateUrl: './benefitPack-benefit.component.html',
  styleUrls: ['./benefitPack-benefit.component.css']
})
export class BenefitPackBenefitsComponent implements OnInit {
  search= null
  data = [];
  selectedPackData = []
  constructor(private request : RequestService, private storage : StoreService,private fb: FormBuilder,private route: ActivatedRoute, private location: Location    ) {
  }
 
  ngOnInit() {
    //this.getPackData()
    if(this.storage.benefitPack.selectedBenefitPack == null){
      this.location.back();
    }
    //mocing
    this.data = [
       {BENEFIT_ID: 1, CAPTION: "captions", BODY: "body", ACTIVE: true},
       {BENEFIT_ID: 2, CAPTION: "captions2", BODY: "body2", ACTIVE: true},
       {BENEFIT_ID: 3, CAPTION: "captions3", BODY: "body3", ACTIVE: true},
    ]
    this.selectedPackData = [
      {BENEFIT_ID: 2, CAPTION: "captions2", BODY: "body2", ACTIVE: true},
      {BENEFIT_ID: 3, CAPTION: "captions3", BODY: "body3", ACTIVE: true},
    ]
  }
  add(item) : void{
    this.request.post('api/benefitPackBenefits/add/'+ this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID,item)
    .subscribe((response)=>{
      if(response ){
        this.selectedPackData.push(item);
      }
      
    })
  }
  remove(item,index) : void{
    
    this.request.post('api/benefitPackBenefits/remove/'+ this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID,item)
    .subscribe((response)=>{
      if(response ){
        this.selectedPackData.splice(index,1);
      }  
    })
  }
  searchClick() : void{
    this.request
    .get({
      url: 'api/benefit', params: {
        search: this.search
      }
      }).subscribe((response)=>{
      if(response){
        this.data = response
      }
    })
  }
  
  getPackData() : void{
    this.request
    .get({ url: 'api/benefitPackBenefits/' + this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID })
    .subscribe((response)=>{
      if(response){
        this.selectedPackData = response
      }
    })
  }

  

}

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
  search = ''
  data = [];
  realData = [];
  selectedPackData = []
  constructor(private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.getPackData()
    if (this.storage.benefitPack.selectedBenefitPack == null) {
      this.location.back();
    }
    console.log(this.storage.benefitPack.selectedBenefitPack.item.USED);
    
    //mocing

  }
  add(item, index): void {
    let model = {
      BENEFIT_PACK_ID: this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID,
      BENEFIT_ID: item.BENEFIT_ID,
      ORDER_NUMBER: this.selectedPackData ? this.selectedPackData.length + 1 : 0
    }
    this.request.post('api/benefitpackbenefits', model)
      .subscribe((response) => {
        if (response) {
          this.selectedPackData.push(item);
          this.data.splice(index, 1);

        }

      })
  }
  updateOrder(item) {
    let model = { BENEFIT_PACK_BENEFIT_ID: item.BENEFIT_PACK_BENEFIT_ID, ORDER_NUMBER: item.ORDER_NUMBER }
    this.request.update('api/benefitpackbenefits/' + this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID, model).subscribe((response) => {
      if(response){
        this.selectedPackData = response.data
      }
    })
  }
  remove(item, index): void {

    this.request.delete('api/benefitpackbenefits/' + this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID)
      .subscribe((response) => {
        if (response) {
          this.selectedPackData.splice(index, 1);
        }
      })
  }
  searchClick(): void {

    if(this.search != ''){
      this.data = this.data.filter((item) =>{
        return item.BENEFIT.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0
      });
      console.log(this.data);
      
    }else{
      this.getPackData();
    }
  }
 

  getPackData(): void {
    this.request
      .get('api/benefitpackbenefits/' + this.storage.benefitPack.selectedBenefitPack.item.BENEFIT_PACK_ID)
      .subscribe((response) => {
        if (response) {
          this.selectedPackData = response.data[0].selected ?  response.data[0].selected  : [];
          this.data = response.data[0].unselected
          this.realData = Object.assign({},this.data)
        }
      })
  }



}

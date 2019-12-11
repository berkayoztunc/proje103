import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})

export class AdressComponent implements OnInit {
  historyData = [];
  form: FormGroup;
  cities;
  countries;
  constructor(
    public request: RequestService,
    public storage: StoreService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.createForm();

  }
  createForm() {
    this.form = this.fb.group({
      ADDRESS: [null],
      CITY_ID: [null],
      COUNTRY_ID: [1,Validators.required]
    });
  }

  ngOnInit() {
    this.request.get('api/countries').subscribe((response) => {
      this.countries = response.data;
    });
    this.form.patchValue({
      'ADDRESS' : this.storage.policy.selectedCustomer.ADDRESS,
      "CITY_ID"  : this.storage.policy.selectedCustomer.CITY_ID,
      "COUNTRY_ID": this.storage.policy.selectedCustomer.COUNTRY_ID, 
    })
    this.cityGet();
  }
  cityGet(){
    if(this.form.value['COUNTRY_ID']){
      this.request.get('api/cities/'+this.form.value['COUNTRY_ID']).subscribe((response) => {
        this.cities = response.data;
      });
    }else{
      this.cities = [];
    }
   
  }
  goBack() {
    this.activeModal.dismiss();
  }
  cancel() {
    this.storage.cancelDialog().then((result) => {
      if (result.value) {
        this.goBack();
      }
    });
  }
  save(): void {
    let hand = this.form.value
    hand['POLICY_ID'] = this.storage.policy.selectedPolicy.POLICY_ID;
    this.request.post('api/policy/customer/update-address/' + this.storage.policy.selectedCustomer.ADDRESS_ID, hand).subscribe((response) => {
      if (response) {
        this.storage.policy.historys = response.data; 
        this.goBack();
        this.storage.successDialog()
      }

    });
  }


}

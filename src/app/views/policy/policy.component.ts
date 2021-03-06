import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { AdressComponent } from './address/address.component';
import { ExternalComponent } from './external/external.component';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})

export class PolicyComponent implements OnInit {
  searchData = [];
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {


    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      LAST_NAME: [null],
      POLICY_NUMBER: [null],
      EXTERNAL_POLICY_NUMBER: [null],
      NATIONAL_ID: [null],
      MOBILE_PHONE: [null],
    });
  }
  get validator() { return this.form.controls; }
  editCustomer() {
    this.modalService.open(CustomerComponent);
  }
  info() {
    let obj = Object.keys(this.storage.policy.selectedCustomer);
    obj = obj.splice(0, obj.length);
    return obj;
  }
  sendGuide(){
    this.request.post('api/policy/send-guide-letter/'+ this.storage.policy.selectedPolicy.POLICY_ID,{}).subscribe((response)=>{
      if(response){
        this.storage.policy.historys = response.data; 
      }
    })
  }
  sendWelcome(){
    this.request.post('api/policy/send-welcome_letter/'+ this.storage.policy.selectedPolicy.POLICY_ID,{}).subscribe((response)=>{
      if(response){
        this.storage.policy.historys = response.data; 
      }
    })
  }
  sendRenew(){
    this.request.post('api/policy/send-renewal-letter/'+ this.storage.policy.selectedPolicy.POLICY_ID,{}).subscribe((response)=>{
      if(response){
        this.storage.policy.historys = response.data; 
      }
    })
  }
  infoPolicy() {
    let obj = Object.keys(this.storage.policy.selectedPolicy);
    obj = obj.splice(0, obj.length);
    return obj;
  }
  infoPolicyProducty(){
    let obj = Object.keys(this.storage.policy.selectedPolicy.product[0]);
    obj = obj.splice(0, obj.length);
    return obj;
  }
  externalChange(){
    this.modalService.open(ExternalComponent);
  }
  addressChange(){
    this.modalService.open(AdressComponent)
  }
  ngOnInit() {

  }
  ngOnDestroy(){
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
    this.storage.policy.inPolicy = false;
    this.storage.policy.searchQuery  = null;
    this.searchData = [];
  }

}

import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-custommer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})

export class CustomerComponent implements OnInit {
  form: FormGroup;
  customerType = [];

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
      FIRST_NAME : [null],
      LAST_NAME : [null],
      MOBILE_PHONE : [null],
      WORK_PHONE : [null],
      HOME_PHONE : [null],
      EMAIL : [null],
      CUSTOMER_TYPE : [null],
      ACTIVE : true
    });
  }

  ngOnInit() {
    this.customerType = ['INDIVIDUAL', 'CORPARATE'];

    this.form.patchValue(this.storage.policy.selectedCustomer);
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
    hand['CUSTOMER_ID'] = this.storage.policy.selectedPolicy['CUSTOMER_ID']
    
    this.request.update('api/customers/' + this.storage.policy.selectedPolicy.POLICY_ID , this.form.value).subscribe((response) => {  
      if(response){
        this.storage.policy.historys = response.data    
        this.storage.policy.selectedCustomer['FIRST_NAME'] = this.form.value['FIRST_NAME']
        this.storage.policy.selectedCustomer['LAST_NAME'] = this.form.value['LAST_NAME']
        this.storage.policy.selectedCustomer['MOBILE_PHONE'] = this.form.value['MOBILE_PHONE']
        this.storage.policy.selectedCustomer['WORK_PHONE'] = this.form.value['WORK_PHONE']
        this.storage.policy.selectedCustomer['HOME_PHONE'] = this.form.value['HOME_PHONE']
        this.storage.policy.selectedCustomer['EMAIL'] = this.form.value['EMAIL']
        this.storage.policy.selectedCustomer['CUSTOMER_TYPE'] = this.form.value['CUSTOMER_TYPE']
        this.goBack();
        this.storage.successDialog()
      }

    });
  }



}

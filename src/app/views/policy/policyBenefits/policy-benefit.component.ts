import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-policy-benefit',
  templateUrl: './policy-benefit.component.html',
  styleUrls: ['./policy-benefit.component.css'],
})

export class PolicyBenefitComponent implements OnInit {
  benefits = [];
  constructor(
    private request: RequestService,
    private storage: StoreService,
    private activeModal: NgbActiveModal,
  ) {

  }
  

  ngOnInit(){
    this.request.get('api/policy/benefits/'+this.storage.policy.selectedPolicy['POLICY_ID']).subscribe((response)=>{
      if(response){
        this.benefits = response.data
      }
    })
  }
  goBack(){
    this.activeModal.dismiss()
  }
  cancel() {
    this.storage.cancelDialog().then((result) => {
      if (result.value) {
        this.goBack()
      }
    })
  }
  
 
  
}

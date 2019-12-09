import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ExplanationComponent } from '../explanation/explanation.component';
import { CancelComponent } from '../cancel/cancel.component';
import { PolicyBenefitComponent } from '../policyBenefits/policy-benefit.component';
import { CustomerComponent } from '../customer/customer.component';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})

export class OverviewComponent implements OnInit {
  historyData = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
  ) {


  }
  benefits(){
    this.modalService.open(PolicyBenefitComponent,{size:'lg'});
  }
  explanationAdd(){
    this.modalService.open(ExplanationComponent);
  }
  cancelOpen(){
    this.modalService.open(CancelComponent);
  }
  reinsdate(){

  }
  customer(){
    this.modalService.open(CustomerComponent)
  }
  ngOnInit(){
    this.historyData = this.storage.policy.historys
    this.getHistory();
  }
  getHistory() : void{
    this.request.get('api/policy/history/'+this.storage.policy.selectedPolicy['POLICY_ID']).subscribe((response)=>{
      this.historyData = this.storage.policy.historys =  response.data
    })
  }
  
}

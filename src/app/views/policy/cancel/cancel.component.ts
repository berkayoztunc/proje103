import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css'],
})

export class CancelComponent implements OnInit {
  reasonData = [];
  form: FormGroup;
  selectedType;
  selectedReason;
  grand = null;
  grandData;
  constructor(
    public request: RequestService,
    public storage: StoreService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.createForm();

  }
  createForm() {
    
  }

  ngOnInit() {
    this.request.get('api/cancelreasons/grouped').subscribe((response)=>{
      this.reasonData = response.data
    })
    this.getGrandData();
  }
  typeChange(item){
      this.selectedReason = null
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
  getGrandData(){
    this.request.get('api/policy/calculate-cancellation-policy-refund/'+this.storage.policy.selectedPolicy.POLICY_ID).subscribe((response)=>{
      if(response){
        this.grandData = response.data
        this.grandData.forEach(element => {
          if(element.SELECTED){
            this.grand = element.TITLE
          }
        });
      }
    })
  }
  save(): void {

    let key = this.selectedType.CANCEL_REASON_TYPE
    let model = {
      CANCEL_REASON_ID : this.selectedReason,
      REFUND_TYPE :this.grand
    }
    let url = '';
    let status = 'LIVE';
    switch (key) {
      case 'EXPIRY':
        status = 'CANCEL ON EXPIRY';
        url = 'cancel-on-expiry';
        break;
      case 'IMMEDIATE':
          status = 'CANCEL';
          url = 'cancel-immediately';
        break;
      case 'TURNAROUND':
          url = 'cancel-turnaround';
        break;
      default:
          url = 'cancel-turnaround';
        break;
    }
    this.request.post('api/policy/' +url + '/' + this.storage.policy.selectedPolicy.POLICY_ID,model).subscribe((response)=>{
      if(response){
        this.storage.policy.historys = response.data    
        this.goBack()
        this.storage.policy.selectedPolicy.STATUS = status
        this.storage.successDialog()
      }
    })
  }


}

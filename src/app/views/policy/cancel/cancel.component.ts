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
  grand;
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

    let key = this.selectedType.CANCEL_REASON_TYPE
    let model = {
      CANCEL_REASON_ID : this.selectedReason,
      REFUND_TYPE :this.grand
    }
    let url = '';
    switch (key) {
      case 'EXPIRY':
        url = 'cancel-on-expiry';
        break;
      case 'IMMEDIATE':
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
        this.storage.successDialog()
      }
    })
  }


}

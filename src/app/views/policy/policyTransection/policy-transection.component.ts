import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-policy-benefit',
  templateUrl: './policy-transection.component.html',
  styleUrls: ['./policy-transection.component.css'],
})

export class PolicyTransectionComponent implements OnInit {
  transection = [];
  constructor(
    public request: RequestService,
    public storage: StoreService,
    private activeModal: NgbActiveModal,
  ) {

  }


  ngOnInit() {
    this.request.get('api/policy/transection/' + this.storage.policy.selectedPolicy.POLICY_ID).subscribe((response) => {
      if (response) {
        this.transection = response.data;
      }
    });
  }
  goBack() {
    this.activeModal.dismiss();
  }
  cancel() {
    this.goBack();
  }



}

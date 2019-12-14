import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css'],
})

export class ExternalComponent implements OnInit {
  historyData = [];
  form: FormGroup;
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
      EXTERNAL_POLICY_NUMBER: [null]
    });
  }

  ngOnInit() {
    this.form.patchValue({
      EXTERNAL_POLICY_NUMBER : this.storage.policy.selectedPolicy.EXTERNAL_POLICY_NUMBER
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
    this.request.update('api/policy/external-policy-number/' + this.storage.policy.selectedPolicy.POLICY_ID, this.form.value).subscribe((response) => {
      if (response) {
        this.storage.policy.historys = response.data;
        this.storage.policy.selectedPolicy.EXTERNAL_POLICY_NUMBER = this.form.value.EXTERNAL_POLICY_NUMBER
        this.goBack();
        this.storage.successDialog()
      }

    });
  }


}

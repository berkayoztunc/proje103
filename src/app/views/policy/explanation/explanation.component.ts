import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css'],
})

export class ExplanationComponent implements OnInit {
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
      EXPLANATION: [null,Validators.required]
    });
  }

  ngOnInit() {
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
    this.request.post('api/policy/explanation/' + this.storage.policy.selectedPolicy.POLICY_ID, this.form.value).subscribe((response) => {
      if (response) {
        this.storage.policy.historys = response.data; // TODO ::: burayı düzelticeksin
        this.goBack();
        this.storage.successDialog()
      }

    });
  }


}

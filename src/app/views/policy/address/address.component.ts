import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})

export class AdressComponent implements OnInit {
  historyData = [];
  form: FormGroup;
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
      COUNTRY_ID: [null]
    });
  }

  ngOnInit() {
    this.request.get('api/countries').subscribe((response) => {
      this.countries = response.data;
    });
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
    this.request.post('api/policy/customer/update-address/' + this.storage.policy.selectedPolicy.POLICY_ID, this.form.value).subscribe((response) => {
      if (response) {
        //this.storage.policy.historys = response.data; // TODO ::: burayı düzelticeksin
        this.goBack();
        this.storage.successDialog()
      }

    });
  }


}

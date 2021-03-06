import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExplanationComponent } from '../explanation/explanation.component';
import { CancelComponent } from '../cancel/cancel.component';
import { PolicyBenefitComponent } from '../policyBenefits/policy-benefit.component';
import { CustomerComponent } from '../customer/customer.component';
import { AdressComponent } from '../address/address.component';
import { TranslateService } from '@ngx-translate/core';
import { PolicyTransectionComponent } from '../policyTransection/policy-transection.component';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})

export class OverviewComponent implements OnInit {
  historyData = [];
  constructor(
    public translate: TranslateService,
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
  ) {


  }
  benefits() {
    this.modalService.open(PolicyBenefitComponent, { size: 'lg' });
  }
  explanationAdd() {
    this.modalService.open(ExplanationComponent);
  }
  cancelOpen() {
    if (this.storage.policy.selectedPolicy.STATUS == 'LIVE') {
      this.modalService.open(CancelComponent);
    }
  }
  renewControl() {
    let now = Date();
    let date = Date.parse(now);
    let dateRenewal = Date.parse(this.storage.policy.selectedPolicy['RENEWAL_DATE']);

    return date <= dateRenewal;
  }
  reinsdate() {
    if (this.storage.policy.selectedPolicy.STATUS != 'LIVE' && this.renewControl()) {
      this.storage.cancelDialog(this.translate.translations[this.translate.currentLang].dialog_reinstate).then((result) => {
        if (result.value) {

          this.request.get('api/policy/reinstate/' + this.storage.policy.selectedPolicy.POLICY_ID).subscribe((response) => {
            if (response) {
              this.storage.policy.historys = response.data;
              this.storage.policy.selectedPolicy.STATUS = 'LIVE'
              this.storage.successDialog()
            }
          })

        }
      })
    }
  }
  showTransection(){
    this.modalService.open(PolicyTransectionComponent, { size: 'lg' });
  }
  addressChange() {
    this.modalService.open(AdressComponent)
  }
  customer() {
    this.modalService.open(CustomerComponent);
  }
  ngOnInit() {
    this.getHistory();
  }
  getHistory(): void {
    this.request.get('api/policy/history/' + this.storage.policy.selectedPolicy.POLICY_ID).subscribe((response) => {
      if (response) {
        this.storage.policy.historys = response.data;
      }
    });
  }

}

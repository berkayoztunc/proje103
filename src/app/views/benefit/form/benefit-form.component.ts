import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { Benefit } from 'src/app/models/benefit';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Benefit',
  templateUrl: './Benefit-form.component.html',
  styleUrls: ['./Benefit-form.component.css']
})
export class BenefitFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  constructor(private activeModal: NgbActiveModal, private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      BENEFIT_ID: [''],
      BENEFIT: ['', Validators.required],
      EXPLANATION: ['', Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {

    if (this.storage.benefit.selectedBenefit != null) {
      this.edit = false
      this.form.patchValue(this.storage.benefit.benefits[this.storage.benefit.selectedBenefit.index]);
    }
    this.initValue = this.form.value
    this.onChanges()
  }
  cancel() {
    if (this.change) {
      this.storage.cancelDialog().then((result) => {
        if (result.value) {
          this.goBack()
        }
      })
    } else {
      this.goBack()
    }
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.change = (JSON.stringify(val) !== JSON.stringify(this.initValue))
    });
  }
  goBack(): void {
    this.activeModal.dismiss();
  }
  save(): void {
    if (!this.edit) {
      let hand = this.form.value;

      this.request.update('api/benefits/' + hand.BENEFIT_ID, hand).subscribe(() => {
        this.storage.benefit.benefits[this.storage.benefit.selectedBenefit.index] = hand
        this.goBack()
      });
    } else {
      this.request.post('api/benefits', this.form.value).subscribe((response) => {
        this.storage.benefit.benefits.unshift(response.data[0]);
        this.form.reset()
        this.goBack()
      });
    }
  }

}

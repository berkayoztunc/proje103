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

  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  get validator() { return this.form.controls; }
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  // ** crud stumb ** //
  item = this.storage.benefit.benefits;
  selected = this.storage.benefit.selectedBenefit;
  url = 'api/benefits';
  idFlag = 'BENEFIT_ID';
  createForm() {
    this.form = this.fb.group({
      BENEFIT_ID: [''],
      BENEFIT: ['', Validators.required],
      EXPLANATION: ['', Validators.required],
      ACTIVE: [''],
    });
  }

  ngOnInit() {
    if (this.selected != null) {
      this.edit = false;
      this.form.patchValue(this.selected.item);
    }
    this.initValue = this.form.value;
    this.onChanges();
  }
  cancel() {
    if (this.change) {
      this.storage.cancelDialog().then((result) => {
        if (result.value) {
          this.goBack();
        }
      });
    } else {
      this.goBack();
    }
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.change = (JSON.stringify(val) !== JSON.stringify(this.initValue));
    });
  }
  goBack(): void {
    this.activeModal.dismiss();
  }
  save(): void {
    if (!this.edit) {
      const hand = this.form.value;
      hand.check = true;
      this.request.update(this.url + '/' + hand[this.idFlag], hand).subscribe(() => {
        this.item[this.selected.index] = hand;
        this.goBack();
      });
    } else {
      this.request.post(this.url, this.form.value).subscribe((response) => {
        if (response) {
          response.data[0].check = true;
          this.item.unshift(response.data[0]);
          this.form.reset();
          this.goBack();
        }
      });
    }
  }

}

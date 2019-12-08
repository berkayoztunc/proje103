import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Currency',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      CURRENCY_ID: [''],
      CURRENCY: ['', Validators.required],
      PREFIX: ['', Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    if (this.storage.currency.selectedCurrency !== null) {
      this.edit = false
      this.form.patchValue(this.storage.currency.currencyies[this.storage.currency.selectedCurrency.index]);
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
      hand.id = hand.CURRENCY_ID
      this.request.update('api/currencies/' + hand.CURRENCY_ID, hand).subscribe((response) => {
        this.storage.currency.currencyies[this.storage.currency.selectedCurrency.index] = hand;
        this.goBack();
        this.form.reset()
      });

    } else {
      this.request.post('api/currencies', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.currency.currencyies.unshift(response.data[0]);
          this.form.reset()
          this.goBack()
        }
      });
    }
  }

}

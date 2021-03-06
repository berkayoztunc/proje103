import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Country',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  // ** crud stumb ** //
  item = this.storage.country.countrys;
  selected = this.storage.country.selectedCountry;
  url = 'api/countries';
  idFlag = 'COUNTRY_ID';
  constructor(public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      COUNTRY_ID: [''],
      COUNTRY: ['', Validators.required],
      COUNTRY_CODE: ['', Validators.required],
      PHONE_CODE: ['', Validators.required],
      ACTIVE: ['']
    });
  }

  get validator() { return this.form.controls; }

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

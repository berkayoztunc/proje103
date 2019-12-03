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
  constructor(public activeModal: NgbActiveModal, private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
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


    if (this.storage.country.selectedCountry !== null) {
      this.edit = false
      this.form.patchValue(this.storage.country.countrys[this.storage.country.selectedCountry.index]);
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
      this.request.update('api/countries/' + hand.COUNTRY_ID, hand).subscribe((response) => {
        this.storage.country.countrys[this.storage.country.selectedCountry.index] = hand;
        this.goBack()
        this.form.reset()
      });

    } else {
      this.request.post('api/countries', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.country.countrys.unshift(response.data[0]);
          this.goBack()
        }
      });
    }
  }

}

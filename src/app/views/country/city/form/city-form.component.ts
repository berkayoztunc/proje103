import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/country';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-City',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})

export class CityFormComponent implements OnInit {
  form: FormGroup;
  countries = [];
  edit = true;
  change = false;
  initValue = {};
  // ** crud stumb ** //
  item = this.storage.benefit.benefits;
  selected = this.storage.benefit.selectedBenefit;
  url = 'api/cities';
  idFlag = 'CITY_ID';

  constructor(private activeModal: NgbActiveModal, public request: RequestService , public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      CITY_ID: [''],
      COUNTRY_ID: ['', Validators.required],
      CITY: ['', Validators.required],
      CITY_CODE: ['', Validators.required],
      ACTIVE: ['']
    });
  }

  get validator() { return this.form.controls; }

  ngOnInit() {
    this.countries = this.storage.country.countrys;
    if (this.storage.country.selectedCountry != null) {
      this.form.patchValue({COUNTRY_ID : this.storage.country.selectedCountry.item.COUNTRY_ID});
    }
    if (this.storage.city.selectedCity != null) {
      this.edit = false;
      this.form.patchValue(this.storage.city.cityies[this.storage.city.selectedCity.index]);
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
      this.request.update(this.url+'/' + hand.CITY_ID, hand).subscribe(
        response => {
          if (response) {
            this.storage.city.cityies[this.storage.city.selectedCity.index] = hand;
            this.form.reset();
            this.goBack();
          }
        }
      );
    } else {
      this.request.post(this.url, this.form.value).subscribe((response) => {
        if (response) {
          response.data[0].check = true;
          this.storage.city.cityies.unshift(response.data[0]);
          this.form.reset();
          this.goBack();
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryFormComponent } from './form/country-form.component';

@Component({
  selector: 'app-Country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  data: Country[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/countries';
  idFlag = 'COUNTRY_ID';
  constructor( private modalService: NgbModal,
               public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.searchCountrys();
    }
    this.data = this.storage.country.countrys;

  }
  searchClick() {
    this.storage.country.countrys.map((item) => {
      const check = item.COUNTRY.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.country.selectedCountry = {item , index};
    this.modalService.open(CountryFormComponent);
  }
  view(item) {
    this.storage.country.selectedCountry = {item};
    this.route.navigate(['dashboard/country/city']);
  }
  create() {
    this.storage.country.selectedCountry = null;
    this.modalService.open(CountryFormComponent);

  }
  searchCountrys(): void {
    this.request.get( this.url )
    .subscribe(response => {
      if (response) {
        this.data = this.storage.country.countrys = response.data.map((item) => {
          item.check = true;
          return item;
        });
      }
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url+'/' + item[this.idFlag]).subscribe(() => {
          this.storage.country.countrys.splice(i, 1);
          this.data = this.storage.country.countrys;
        });
      }
    });
  }

}

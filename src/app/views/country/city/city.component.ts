import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityFormComponent } from './form/city-form.component';

@Component({
  selector: 'app-City',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  data: City[];
  City: City;
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/cities';
  idFlag = 'CITY_ID';
  constructor( private modalService: NgbModal,
               public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.storage.country.selectedCountry == null) {
      this.route.navigate(['dashboard/country']);

    }
    if (this.tabelOnInit) {
      this.searchCitys();
    }
    this.data = this.storage.city.cityies;


  }
  searchClick() {
    this.storage.city.cityies.map((item) => {
      const check = item.CITY.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.city.selectedCity = {item, index};
    this.modalService.open(CityFormComponent);
  }
  create() {
    this.storage.city.selectedCity = null;
    this.modalService.open(CityFormComponent);
  }
  searchCitys(): void {
    this.request.get( this.url+'/' + this.storage.country.selectedCountry.item.COUNTRY_ID )
    .subscribe(response => {
      if (response) {
        this.data = this.storage.city.cityies = response.data.map((item) => {
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
          this.storage.city.cityies.splice(i, 1);
          this.data = this.storage.city.cityies;
        });
      }
    });
  }

}

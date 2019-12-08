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
  countrys : Country[];
  Country : Country;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor( private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService,public storage : StoreService, private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchCountrys()
    }
    this.countrys = this.storage.country.countrys;

  }
  searchClick(){
    if(this.search != ''){
      this.countrys = this.countrys.filter((item) =>{
        return item.COUNTRY.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0
      });
    }else{
      this.countrys = this.storage.country.countrys;
    }
  }  
  select(item,index){
    this.storage.country.selectedCountry = {item ,index};
    this.modalService.open(CountryFormComponent)
  }
  view(item){
    this.storage.country.selectedCountry = {item};
    this.route.navigate(['dashboard/country/city'])
  }
  create(){
    this.storage.country.selectedCountry = null;
    this.modalService.open(CountryFormComponent)

  }
  searchCountrys(): void {
    this.request.get( 'api/countries' )
    .subscribe(response => {
      this.countrys = this.storage.country.countrys = response.data 
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/countries/' + item.COUNTRY_ID).subscribe(() => {
          this.storage.country.countrys.splice(i, 1);
          this.countrys = this.storage.country.countrys 
        });
      }
    })
  }

}

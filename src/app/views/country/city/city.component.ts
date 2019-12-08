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
  cityies : City[];
  City : City;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor( private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService, public storage :StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.storage.country.selectedCountry == null){
      this.route.navigate(['dashboard/country'])

    }
    if(this.tabelOnInit){
      this.searchCitys()
    }
    this.cityies = this.storage.city.cityies;
    

  }
  searchClick(){
    if(this.search != ''){
      this.cityies = this.cityies.filter((item) =>{
        return item.CITY.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 || item.CITY_CODE.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      });
    }else{
      this.cityies = this.storage.user.users
    }
  }  
  select(item,index){
    this.storage.city.selectedCity = {item,index};
    this.modalService.open(CityFormComponent)
  }
  create(){
    this.storage.city.selectedCity = null;
    this.modalService.open(CityFormComponent)
  }
  searchCitys(): void {
    this.request.get( 'api/cities' )
    .subscribe(response => {
      this.cityies = this.storage.city.cityies = response.data   
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/cities/' + item.CITY_ID).subscribe(() => {
          this.storage.city.cityies.splice(i, 1);
          this.cityies = this.storage.city.cityies
        });
      }
    })
  }

}

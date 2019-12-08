import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RequestService } from 'src/app/services/request.service';
import { Currency } from 'src/app/models/currency';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyFormComponent } from './form/currency-form.component';

@Component({
  selector: 'app-Currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  Currencys : Currency[];
  Currency : Currency;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService,public storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchCurrencys()
    }
    this.Currencys = this.storage.currency.currencyies;

  }
  searchClick(){
    if(this.search != ''){
      this.Currencys = this.Currencys.filter((item) =>{
        return item.CURRENCY.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 || item.PREFIX.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      });
    }else{
      this.Currencys = this.storage.currency.currencyies
    }
  }  
  select(item,index){
    this.storage.currency.selectedCurrency = {item,index};
    this.modalService.open(CurrencyFormComponent)

  }
  create(){
    this.storage.currency.selectedCurrency = null;
    this.modalService.open(CurrencyFormComponent)

  }
  searchCurrencys(): void {
    this.request.get( 'api/currencies' )
    .subscribe(response => {
      this.Currencys = this.storage.currency.currencyies = response.data
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/currencies/' + item.CURRENCY_ID).subscribe(() => {
          this.storage.currency.currencyies.splice(i, 1);
          this.Currencys = this.storage.currency.currencyies
        });
      }
    })
  }

}

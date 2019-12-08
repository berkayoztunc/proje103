import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './form/product-form.component';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {
  Products : Product[];
  Product : Product;
  search= '';
  tabelOnInit = true;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private request : RequestService,private storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchProducts()
    }
    this.Products = this.storage.product.products;

  }
  searchClick(){
    if(this.search != ''){
      this.Products = this.Products.filter((item) =>{
        return item.PRODUCT.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 
      });
    }else{
      this.Products = this.storage.user.users
    }
    
  }  
  select(item,index){
    this.storage.product.selectedProduct = {item,index};
    this.modalService.open(ProductFormComponent,{size:'xl'})

  }
  activation(item){
    this.request.post('api/products/' + item.PRODUCT_ID, {ACTIVE : !item.ACTIVE}).subscribe((response)=>{
      if(response){
        item.ACTIVE = !item.ACTIVE;
      }
    })
  }
  create(){
    this.storage.product.selectedProduct = null;
    this.modalService.open(ProductFormComponent,{size:'xl'})
  }
  searchProducts(): void {
    this.request.get( 'api/products' )
    .subscribe(response => {
      this.Products = this.storage.product.products = response.data     
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/products/' + item.PRODUCT_ID).subscribe(() => {
          this.storage.product.products.splice(i, 1);
          this.Products = this.storage.product.products
        });
      }
    })
  }

}

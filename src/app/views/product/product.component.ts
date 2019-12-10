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
  data: Product[];
  search = '';
  tabelOnInit = true;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.searchProducts();
    }
    this.data = this.storage.product.products;

  }
  searchClick() {
    this.storage.product.products.map((item) => {
      const check = item.PRODUCT.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });

  }
  select(item, index) {
    this.storage.product.selectedProduct = {item, index};
    this.modalService.open(ProductFormComponent, {size: 'xl'});

  }
  activation(item) {
    this.request.post('api/products/' + item.PRODUCT_ID, {ACTIVE : !item.ACTIVE}).subscribe((response) => {
      if (response) {
        item.ACTIVE = !item.ACTIVE;
      }
    });
  }
  create() {
    this.storage.product.selectedProduct = null;
    this.modalService.open(ProductFormComponent, {size: 'xl'});
  }
  searchProducts(): void {
    this.request.get( 'api/products' )
    .subscribe(response => {
      if (response) {

        this.data = this.storage.product.products = response.data.map((item) => {
          item.check = true;
          return item;
        });
      }
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/products/' + item.PRODUCT_ID).subscribe(() => {
          this.storage.product.products.splice(i, 1);
          this.data = this.storage.product.products;
        });
      }
    });
  }

}

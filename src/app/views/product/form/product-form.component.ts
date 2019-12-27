import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/models/partner';
import { Channel } from 'src/app/models/channel';
import { BenefitPack } from 'src/app/models/benefitPacks';
import { ServiceType } from 'src/app/models/serviceType';
import { Currency } from 'src/app/models/currency';
import { Product } from 'src/app/models/product';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Product',
  templateUrl: './Product-form.component.html',
  styleUrls: ['./Product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  partners$ = [];
  channels$ = [];
  benefitPacks$ = [];
  serviceType$ = [];
  currencyies$ = [];
  product$ = [];
  productType = [];
  saleType = [];
  bussinesModel = [];
  edit = true;
  change = false;
  initValue = {};
  // ** crud stumb ** //
  item = this.storage.benefit.benefits;
  selected = this.storage.benefit.selectedBenefit;
  url = 'api/benefits';
  idFlag = 'BENEFIT_ID';

  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      PRODUCT_ID: [null],
      PRODUCT: [null],
      BUSINESS_MODEL: [null],
      BUSINESS_PARTNER_ID: [null, Validators.required],
      PARTNER_CHANNEL_ID: [null, Validators.required],
      BENEFIT_PACK_ID: [null, Validators.required],
      SOLDBY: [null],
      SERVICE_TYPE_ID: [null, Validators.required], // from ServiceType: value: SERVICE_TYPE_ID view: PREFIX + ' - '+SERVICE_TYPE where ACTIVE===true
      POLICY_LENGHT_MONTHS: [null], // default: 12
      REFUND_CANCEL_PERIOD_DAYS: [null],
      PRODUCT_TYPE: [null, Validators.required], // enum: INDIVIDUAL || CORPORATE
      WELCOME: [false], // default: false
      RENEWAL: [false], // default: false
      GUIDE: [false], // default: false
      DUPLICATE_CONTROL: [false], // default: false
      ACTIVE: [true], // default: true
      NEW_COMMISSION_RATE: [null],
      RENEWAL_COMMISSION_RATE: [null],
      MIGRATION_PRODUCT_ID: [null],
      MIGRATION_DATE: [null],
      EXPLANATION: [null], // sınırsız hatırlatma notları textarea
      PRICE: [null],
      CURRENCY: [null, Validators.required], // defaılt: TRY
      PRODUCT_SALE_TYPE: [null, Validators.required], // enum: WHOLESALE || RETAIL

    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    /*this.edit = this.route.snapshot.paramMap.get('PRODUCT_ID') == null

   if(!this.edit){
     const routeProductId = +this.route.snapshot.paramMap.get('PRODUCT_ID');

     this.ProductService.getProduct(routeProductId).subscribe(Product=>{
       this.form.patchValue(Product);
     })
     // request search from http corporate
   }*/
    this.productType = ['INDIVIDUAL', 'CORPORATE'];
    this.saleType = ['WHOLESALE', 'RETAIL'];
    this.bussinesModel = ['AGENCY', 'SERVICE'];
    this.request.get('api/partners').subscribe((response) => {
      this.partners$ = response.data;
    });
    this.request.get('api/products').subscribe((response) => {
      this.product$ = response.data;
    });
    this.request.get('api/partnerchannels').subscribe((response) => {
      this.channels$ = response.data;
    });
    this.request.get('api/benefitpacks').subscribe((response) => {
      this.benefitPacks$ = response.data;
    });
    this.request.get('api/servicetypes').subscribe((response) => {
      this.serviceType$ = response.data;
    });
    this.request.get('api/currencies').subscribe((response) => {
      this.currencyies$ = response.data;
    });
    if (this.storage.product.selectedProduct !== null) {
      this.edit = false;
      this.form.patchValue(this.storage.product.products[this.storage.product.selectedProduct.index]);
    }
    this.initValue = this.form.value;
    console.log();

    this.onChanges();
  }
  disableMyInput(key) {
    let boolean = !this.edit && this.storage.product.selectedProduct.item.USED;
    if (boolean) {
      this.form.get(key).disable();
    } else {
      this.form.get(key).enable();
    }
  }

  goBack(): void {
    this.activeModal.dismiss();
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.change = (JSON.stringify(val) !== JSON.stringify(this.initValue));
    });
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
  save(): void {
    if (!this.edit) {
      const hand = this.form.value;
      hand.check = true;
      this.request.update('api/products/' + hand.PRODUCT_ID, hand).subscribe((response) => {
        if (response) {
          this.storage.product.products[this.storage.product.selectedProduct.index] = hand;
          this.goBack();
          this.form.reset();
          this.storage.successDialog();
        }
      });

    } else {
      this.request.post('api/products', this.form.value).subscribe((response) => {
        if (response) {
          response.data[0].check = true;
          this.storage.product.products.unshift(response);
          this.storage.successDialog();
          this.form.reset();
          this.goBack();
        }

      });
    }
  }

}

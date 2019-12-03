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
  partners$ : Observable<Partner[]>;
  channels$ : Observable<Channel[]>;
  benefitPacks$ : Observable<BenefitPack[]>
  serviceType$ : Observable<ServiceType[]>
  currencyies$ : Observable<Currency[]>
  product$ : Observable<Product[]>
  productType = [];
  saleType = [];
  edit=true;
  constructor(private activeModal : NgbActiveModal,private request : RequestService , private storage : StoreService,private fb: FormBuilder,private route: ActivatedRoute, private location: Location    ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      PRODUCT_ID : [''],
      PRODUCT: [''],
      BUSINESS_MODEL: [''],
      BUSINESS_PARTNER_ID: [null,Validators.required],
      PARTNER_CHANNEL_ID: [null,Validators.required],
      BENEFIT_PACK_ID: [null,Validators.required],
      SOLDBY: [''],
      SERVICE_TYPE_ID: [null,Validators.required], //from ServiceType: value: SERVICE_TYPE_ID view: PREFIX + ' - '+SERVICE_TYPE where ACTIVE===true
      POLICY_LENGHT_MONTHS: [''], // default: 12
      REFUND_CANCEL_PERIOD_DAYS: [''],
      PRODUCT_TYPE: [null,Validators.required], // enum: INDIVIDUAL || CORPORATE
      WELCOME: [''], // default: false
      RENEWAL: [''], // default: false
      GUIDE: [''], // default: false
      DUPLICATE_CONTROL: [''], // default: false
      ACTIVE: [''], //default: true
      NEW_COMMISSION_RATE: [''],
      RENEWAL_COMMISSION_RATE: [''],
      MIGRATION_PRODUCT_ID: [null],
      MIGRATION_DATE: [''],
      EXPLANATION: [''], //sınırsız hatırlatma notları textarea
      PRICE: [''],
      CURRENCY: [null,Validators.required],//defaılt: TRY
      OLD_PRODUCT_ID: [''],
      OLD_CAMPAIGN_ID: [''],
      PRODUCT_SALE_TYPE: [null,Validators.required],// enum: WHOLESALE || RETAIL
      
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
      // request search from http
    }*/
    this.productType = ["INDIVISUAL","CORPARATE"]
    this.saleType = ["WHOLESALE","RETAIL"]
    this.request.get( 'api/partners' ).subscribe((response)=>{
      this.partners$  = response.data
    });
    this.request.get( 'api/products' ).subscribe((response)=>{
      this.product$ = response.data
    });
    this.channels$ = this.request.get( 'api/channels' );  
    this.benefitPacks$ = this.request.get( 'api/benefitpacks' )
    this.serviceType$ = this.request.get( 'api/servicetypes' )
    this.currencyies$ = this.request.get( 'api/currencies' )
    if(this.storage.product.selectedProduct !== null){
      this.edit = false
      this.form.patchValue(this.storage.product.products[this.storage.product.selectedProduct.index]);      
    }
  }

  goBack(): void {
    this.activeModal.dismiss();
  }
  save(): void {
    if(!this.edit){
        let hand = this.form.value;
        hand.id = hand.PRODUCT_ID
        this.request.update('api/product',hand).subscribe((response) => {
          if(response){
            this.storage.product.products[this.storage.product.selectedProduct.index] = hand;
          }
        });
this.goBack();
        this.form.reset()
    }else{
      this.request.post('api/product',this.form.value).subscribe((response)=>{
        if(response){
          this.storage.product.products.unshift(response);
          this.form.reset()
          this.goBack()
        }
        
      } );
    }
  }

}

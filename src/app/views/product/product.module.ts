import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }

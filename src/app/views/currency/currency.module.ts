import { NgModule } from '@angular/core';
import { CurrencyComponent } from './currency.component';
import { CommonModule } from '@angular/common';
import { CurrencyRoutingModule } from './currency-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    CurrencyRoutingModule,
  ]
})
export class CurrencyModule { }

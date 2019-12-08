import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CityRoutingModule,
  ]
})
export class CityModule { }

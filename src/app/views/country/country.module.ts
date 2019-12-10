import { NgModule } from '@angular/core';
import { CountryComponent } from './country.component';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CityComponent } from './city/city.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [CountryComponent, CityComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CountryRoutingModule,
  ]
})
export class CountryModule { }

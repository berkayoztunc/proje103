import { NgModule } from '@angular/core';
import { CountryComponent } from './country.component';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CityComponent } from './city/city.component';



@NgModule({
  declarations: [CountryComponent,CityComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CountryRoutingModule,
  ]
})
export class CountryModule { }

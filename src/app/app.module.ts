import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule ,HttpClient}    from '@angular/common/http';
import { CommonModule} from '@angular/common';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }from './app.component';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './views/user/form/user-form.component';
import { ServiceTypeFormComponent } from './views/serviceType/form/serviceType-form.component';
import { ProductFormComponent } from './views/product/form/product-form.component';
import { RoleFormComponent } from './views/role/form/role-form.component';
import { PartnerFormComponent } from './views/partner/form/partner-form.component';
import { CurrencyFormComponent } from './views/currency/form/currency-form.component';
import { CountryFormComponent } from './views/country/form/country-form.component';
import { CityFormComponent } from './views/country/city/form/city-form.component';
import { ChannelFormComponent } from './views/channel/form/channel-form.component';
import { CancelReasonFormComponent } from './views/cancelReason/form/cancelReason-form.component';
import { BenefitFormComponent } from './views/benefit/form/benefit-form.component';
import { BenefitPackFormComponent } from './views/benfitPack/form/benefitPack-form.component';
import { ResetPasswordComponent } from './views/dashboard/resetPassword/reset-password.component';
import { AuthGuard } from './guard/auth.guard';
import { SharedModule } from './shared.module';
import { ExplanationComponent } from './views/policy/explanation/explanation.component';
import { CancelComponent } from './views/policy/cancel/cancel.component';
import { SystemErrorComponent } from './components/system-error.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { PermissionDirective } from './directives/permission.directive';
import { PolicyBenefitComponent } from './views/policy/policyBenefits/policy-benefit.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CancelComponent,
    PolicyBenefitComponent,
    AppComponent,
    ExplanationComponent,
    UserFormComponent,
    ServiceTypeFormComponent,
    ProductFormComponent,
    RoleFormComponent,
    PartnerFormComponent,
    CurrencyFormComponent,
    CountryFormComponent,
    CityFormComponent,
    ChannelFormComponent,
    CancelReasonFormComponent,
    BenefitPackFormComponent,
    BenefitFormComponent,
    ResetPasswordComponent,
  ],
  entryComponents : [
    CancelComponent,
    PolicyBenefitComponent,
    ExplanationComponent,
    ResetPasswordComponent,
    UserFormComponent,
    ServiceTypeFormComponent,
    ProductFormComponent,
    RoleFormComponent,
    PartnerFormComponent,
    CurrencyFormComponent,
    CountryFormComponent,
    CityFormComponent,
    ChannelFormComponent,
    CancelReasonFormComponent,
    BenefitPackFormComponent,
    BenefitFormComponent,
    SystemErrorComponent,
  ],
  imports: [
    NgxJsonViewerModule,
    SharedModule,
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
     }
    }),
    
  ],
  providers : [NgbActiveModal,AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

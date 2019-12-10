import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent , children :
    [
      { path: '', redirectTo: 'policy', pathMatch: 'full' },
      { path: 'benefit', loadChildren: () => import('../benefit/benefit.module').then(m => m.BenefitModule) },
      { path: 'benefitPack', loadChildren: () => import('../benfitPack/benefitPack.module').then(m => m.BenefitPackModule) },
      { path: 'cancelReason', loadChildren: () => import('../cancelReason/cancelReason.module').then(m => m.CancelReasonModule) },
      { path: 'country', loadChildren: () => import('../country/country.module').then(m => m.CountryModule) },
      { path: 'partner', loadChildren: () => import('../partner/partner.module').then(m => m.PartnerModule) },
      { path: 'channel', loadChildren: () => import('../channel/channel.module').then(m => m.ChannelModule) },
      { path: 'currency', loadChildren: () => import('../currency/currency.module').then(m => m.CurrencyModule) },
      { path: 'product', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
      { path: 'role', loadChildren: () => import('../role/role.module').then(m => m.RoleModule) },
      { path: 'serviceType', loadChildren: () => import('../serviceType/serviceType.module').then(m => m.ServiceTypeModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'policy', loadChildren: () => import('../policy/policy.module').then(m => m.PolicyModule)},
      { path: 'upload-csv', loadChildren: () => import('../csvUpload/csv-upload.module').then(m => m.CsvUploadModule)},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

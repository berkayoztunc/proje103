import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    SharedModule,
    UserRoutingModule,
  ],

})
export class UserModule { }

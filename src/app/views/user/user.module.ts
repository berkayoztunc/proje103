import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleFormComponent } from './form/role-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RolePermissionSyncComponent } from './permission/role-permission-sync.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [RoleComponent, RolePermissionSyncComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RoleRoutingModule,
  ]
})
export class RoleModule { }

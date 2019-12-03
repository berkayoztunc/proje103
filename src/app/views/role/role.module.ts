import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleFormComponent } from './form/role-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RolePermissionSyncComponent } from './permission/role-permission-sync.component';
import { RoleUserSyncComponent } from './user/role-user-sync.component';



@NgModule({
  declarations: [RoleComponent,RolePermissionSyncComponent,RoleUserSyncComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,
  ]
})
export class RoleModule { }

import { NgModule } from '@angular/core';
import { RolePermissionSyncComponent } from './role-permission-sync.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RolePermissionSyncComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class RolePermissionSyncModule { }

import { NgModule } from '@angular/core';
import { RoleUserSyncComponent } from './role-user-sync.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RoleUserSyncComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class RoleUserSyncModule { }

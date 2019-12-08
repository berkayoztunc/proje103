import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports : [
    UserFormComponent
  ]
})
export class UserFormModule { }

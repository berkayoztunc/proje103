import { NgModule } from '@angular/core';
import { AuditTypeComponent } from './auditType.component';
import { CommonModule } from '@angular/common';
import { AuditTypeRoutingModule } from './auditType-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [AuditTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    AuditTypeRoutingModule,
  ]
})
export class auditTypeModule { }

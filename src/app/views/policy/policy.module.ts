import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PolicyComponent } from './policy.component';
import { PolicyRoutingModule } from './policy-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PolicyRoutingModule,
        TranslateModule,
        NgbModule
    ],
    declarations: [PolicyComponent]

})
export class PolicyModule {}

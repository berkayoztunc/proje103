import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PolicyBenefitComponent } from './policy-benefit.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [PolicyBenefitComponent]

})
export class PolicyBenefitModule {}

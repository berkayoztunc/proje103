import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExplanationComponent } from './explanation.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ExplanationComponent]

})
export class ExplanationModule {}

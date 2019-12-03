import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        ReactiveFormsModule
    ],
    declarations: [ResetPasswordComponent]

})
export class ResetPasswordModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule,
        TranslateModule,
        NgbModule,

    ],
    declarations: [LoginComponent],

})
export class LoginModule {
}

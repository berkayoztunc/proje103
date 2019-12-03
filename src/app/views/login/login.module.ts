import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/components/alert.component';
import { AlertModule } from 'src/app/components/alert.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        TranslateModule,
        NgbModule,
        AlertModule
    ],
    declarations: [LoginComponent],
    
})
export class LoginModule {
}

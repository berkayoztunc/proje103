import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome.component';
import { SharedModule } from 'src/app/shared.module';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        SharedModule,
        WelcomeRoutingModule,
    ],
    declarations: [WelcomeComponent]

})
export class WelcomeModule {
}

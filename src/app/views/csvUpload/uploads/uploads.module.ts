import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { UploadsComponent } from './uploads.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        SharedModule,
    ],
    declarations: []

})
export class UploadsModule {
}

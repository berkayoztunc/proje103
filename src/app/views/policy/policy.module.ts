import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PolicyComponent } from './policy.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        PolicyRoutingModule,
        NgbModule,
        SharedModule
    ],
    declarations: [PolicyComponent,SearchComponent,OverviewComponent]

})
export class PolicyModule {}

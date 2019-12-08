import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert.component';
import { LoaderComponent } from './components/loader.component';
import { SystemErrorComponent } from './components/system-error.component';
import { PermissionDirective } from './directives/permission.directive';
import { ShowAllDirective } from './directives/showAll.directive';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [NgxJsonViewerModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    declarations: [AlertComponent, LoaderComponent, SystemErrorComponent, PermissionDirective,ShowAllDirective],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxJsonViewerModule,
        TranslateModule,
        AlertComponent,
        LoaderComponent,
        SystemErrorComponent,
        PermissionDirective,
        ShowAllDirective

    ]

})
export class SharedModule { }
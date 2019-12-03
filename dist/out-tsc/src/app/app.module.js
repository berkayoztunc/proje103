import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            AppRoutingModule,
            HttpClientModule,
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
        ],
        declarations: [
            AppComponent,
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
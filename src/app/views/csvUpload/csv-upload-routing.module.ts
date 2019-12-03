import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvUploadComponent } from './csv-upload.component';
const routes: Routes = [
    { path: '', component: CsvUploadComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CsvUploadRoutingModule { }
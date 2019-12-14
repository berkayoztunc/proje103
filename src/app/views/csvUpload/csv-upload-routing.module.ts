import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvUploadComponent } from './csv-upload.component';
import { AllUploadsComponent } from './allUploads/allUploads.component';
import { UploadsComponent } from './uploads/uploads.component';
const routes: Routes = [
    { path: '', component: UploadsComponent},
    { path: 'all-upload', component: AllUploadsComponent},
    { path: ':type', component: CsvUploadComponent},
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class CsvUploadRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvUploadComponent } from './csv-upload.component';
import { CsvUploadRoutingModule } from './csv-upload-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { AllUploadsComponent } from './allUploads/allUploads.component';
import { UploadsComponent } from './uploads/uploads.component';



@NgModule({
  declarations: [CsvUploadComponent,AllUploadsComponent,UploadsComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    CsvUploadRoutingModule
  ]
})
export class CsvUploadModule { }

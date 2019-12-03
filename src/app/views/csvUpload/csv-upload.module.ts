import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CsvUploadComponent } from './csv-upload.component';
import { CsvUploadRoutingModule } from './csv-upload-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CsvUploadComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CsvUploadRoutingModule
  ]
})
export class CsvUploadModule { }

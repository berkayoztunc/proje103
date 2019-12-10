import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ValidatorTranformatorService } from 'src/app/services/validator-tranformator.service';
@Component({
  selector: 'app-cvs-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./cvs-upload.component.css']
})
export class CsvUploadComponent {
  fileData: File = null;
  errors;
  handData = [];
  header = [];
  code = false;
  constructor(private papa: Papa, public ValidatorTranformatorService: ValidatorTranformatorService) {}
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();

  }
  preview() {
    const reader = new FileReader();
    reader.readAsText(this.fileData);
    reader.onload = (event) => {
      const data =  reader.result ;
      const options = {
        header : true,
        complete: (result) => {
          this.handData = this.ValidatorTranformatorService.validateWithTransform(result.data, 'test');
          this.errors = this.ValidatorTranformatorService.errorsbag(result.data, 'test');
          this.header = this.ValidatorTranformatorService.header;
        }
        // Add your options here
    };
      this.papa.parse(data.toString(), options);
    };
  }
}

import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ValidatorTranformatorService } from 'src/app/services/validator-tranformator.service';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-cvs-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./cvs-upload.component.css']
}) 
export class CsvUploadComponent {
  fileData: File = null;
  fileError = null;
  handData = [];
  header = [];
  code = false;
  rawData = null;
  uploadSuccess = false;
  formGroup = this.fb.group({
    file: [null],
    file_name : [''],
    file_type  : [''],
  });
  constructor(private storage : StoreService,private fb: FormBuilder,private request :RequestService,private papa: Papa, public ValidatorTranformatorService: ValidatorTranformatorService,private route: ActivatedRoute) {}
  fileProgress(event) {
    let type = this.route.snapshot.paramMap.get("type")
    this.fileData = event.target.files[0]
    this.preview();
    this.formGroup.patchValue({
      file: this.fileData,
      file_type : type,
      file_name : this.fileData.name 
    });    
  }
  
  sendFile(){
    this.request.uploadPost('api/batchs',this.formGroup.value).subscribe((response)=>{
      if(response){
          this.storage.uploaded.id =  response.data[0].BATCH_ID;
          this.send();
      }
    });
  }
  send(){
    let type = this.route.snapshot.paramMap.get("type")
    let data = JSON.stringify(this.rawData);
    
    this.request.post('api/batchs/'+type,{BATCH_ID : this.storage.uploaded.id, DATA: data}).subscribe((response)=>{
      if(response){
        this.storage.successDialog('Çalıştırma işlemi başarılı')
      }
    });
  }
  preview() {
    let type = this.route.snapshot.paramMap.get("type")
    const reader = new FileReader();
    reader.readAsText(this.fileData);
    reader.onload = (event) => {
        const data =  reader.result ;
        const options = {
          header : true,
          complete: (result) => {
            this.uploadSuccess = true;
            this.handData = this.ValidatorTranformatorService.validateWithTransform(result.data, type);
            this.fileError = this.ValidatorTranformatorService.errorsbag(result.data, type);            
            this.header = this.ValidatorTranformatorService.header;
          }
      };
      this.papa.parse(data.toString(), options);      
      const optionsForTheJson = {
        header : true,
        complete: (result) => {
          this.rawData= result.data;
        }
      };
      this.papa.parse(data.toString(), optionsForTheJson);
    };
  }
}

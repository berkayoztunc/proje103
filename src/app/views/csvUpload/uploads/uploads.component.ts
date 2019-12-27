import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
@Component({
  selector: 'app-all-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  constructor(private request : RequestService) {}
  data  =[];
  ngOnInit() {
    this.request.get('api/batchs/uploads').subscribe((response)=>{
      if(response){
        this.data  = response.data;
      }
    })
  }
  download(item){
    this.request.get('api/batchs/download-error/'+item.id,).subscribe((response)=>{
      
    });
  }
  downloadError(item){
    this.request.get('api/batchs/download/'+item.id).subscribe((response)=>{
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
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
}

import { Component, OnInit } from '@angular/core';
import { ServiceType } from 'src/app/models/serviceType';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypeFormComponent } from './form/serviceType-form.component';

@Component({
  selector: 'app-ServiceType',
  templateUrl: './serviceType.component.html',
  styleUrls: ['./serviceType.component.css']
})
export class ServiceTypeComponent implements OnInit {
  ServiceTypes : ServiceType[];
  ServiceType : ServiceType;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request :RequestService , public storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchServiceTypes()
    }
    this.ServiceTypes = this.storage.serviceType.serviceTypes;

  }
  searchClick(){
    if(this.search != ''){
      this.ServiceTypes = this.ServiceTypes.filter((item) =>{
        return item.SERVICE_TYPE.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 || item.PREFIX.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      });
    }else{
      this.ServiceTypes = this.storage.serviceType.serviceTypes;
    }
  }  
  select(item,index){
    this.storage.serviceType.selectedServiceType = {item,index};
    this.modalService.open(ServiceTypeFormComponent)

  }
  create(){
    this.storage.serviceType.selectedServiceType = null;
    this.modalService.open(ServiceTypeFormComponent)

  }
  searchServiceTypes(): void {
    this.request.get( 'api/servicetypes' )
    .subscribe(response => {
      if(response){
        this.ServiceTypes = this.storage.serviceType.serviceTypes =response.data 
      }
    });

  }
  delete(item,i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/servicetypes/' + item.SERVICE_TYPE_ID).subscribe(() => {
          this.storage.serviceType.serviceTypes.splice(i, 1);
          this.ServiceTypes = this.storage.serviceType.serviceTypes
        });
      }
    })
  }

}

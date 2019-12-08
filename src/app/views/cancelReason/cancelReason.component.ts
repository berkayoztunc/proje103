import { Component, OnInit } from '@angular/core';
import { CancelReason } from 'src/app/models/cancelReason';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelReasonFormComponent } from './form/cancelReason-form.component';

@Component({
  selector: 'app-CancelReason',
  templateUrl: './CancelReason.component.html',
  styleUrls: ['./CancelReason.component.css']
})
export class CancelReasonComponent implements OnInit {
  CancelReasons : CancelReason[];
  CancelReason : CancelReason;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor(
    
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,public request : RequestService, public storage : StoreService) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchCancelReasons()
    }
    this.CancelReasons = this.storage.cancelReason.cancelReasons;

  }
  searchClick(){
    if(this.search != ''){
      this.CancelReasons = this.CancelReasons.filter((item) =>{
        return item.CANCEL_REASON.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0
      });
    }else{
      this.CancelReasons = this.storage.cancelReason.cancelReasons;
    }
  }  
  select(item,index){
    this.storage.cancelReason.selectedCancelReason = {item,index};
    this.modalService.open(CancelReasonFormComponent)
  }
  create(){
    this.storage.cancelReason.selectedCancelReason = null;
    this.modalService.open(CancelReasonFormComponent)
  }
  searchCancelReasons(): void {
    this.request.get( 'api/cancelreasons' )
    .subscribe(response => {
      this.CancelReasons = this.storage.cancelReason.cancelReasons = response.data
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/cancelreasons/' + item.CANCEL_REASON_ID).subscribe(() => {
          this.storage.cancelReason.cancelReasons.splice(i, 1);
          this.CancelReasons = this.storage.cancelReason.cancelReasons
        });
      }
    })
  }

}

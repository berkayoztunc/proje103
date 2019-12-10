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
  data: CancelReason[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/cancelreasons';
  idFlag = 'CANCEL_REASON_ID';
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService) {
  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.getData();
    }
    this.data = this.storage.cancelReason.cancelReasons;

  }
  searchClick() {
    this.storage.cancelReason.cancelReasons.map((item) => {
      const check = item.CANCEL_REASON.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;      
      return item.check = check;
    });
  }
  select(item, index) {
    this.storage.cancelReason.selectedCancelReason = { item, index };
    this.modalService.open(CancelReasonFormComponent);
  }
  create() {
    this.storage.cancelReason.selectedCancelReason = null;
    this.modalService.open(CancelReasonFormComponent);
  }
  getData(): void {
    this.request.get(this.url)
      .subscribe(response => {
        if (response) {
          this.data = this.storage.cancelReason.cancelReasons = response.data.map((item) => {
            item.check = true;
            return item;
          });
        }
      });
  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url + '/' + item[this.idFlag]).subscribe(() => {
          this.storage.cancelReason.cancelReasons.splice(i, 1);
          this.data = this.storage.cancelReason.cancelReasons;
        });
      }
    });
  }

}

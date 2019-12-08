import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css'],
})

export class CancelComponent implements OnInit {
  historyData = [];
  form:FormGroup;
  constructor(
    private request: RequestService,
    private storage: StoreService,
    private activeModal: NgbActiveModal,
    private fb : FormBuilder
  ) {
    this.createForm()

  }
  createForm(){
    this.form = this.fb.group({
      EXPLANATION : [null]
    })
  }

  ngOnInit(){
  }
  goBack(){
    this.activeModal.dismiss()
  }
  cancel() {
    this.storage.cancelDialog().then((result) => {
      if (result.value) {
        this.goBack()
      }
    })
  }
  save():void{
    
  }
 
  
}

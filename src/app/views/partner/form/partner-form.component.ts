import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Partner',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue= {};
  constructor(private activeModal : NgbActiveModal,private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      PARTNER_ID: [''],
      PARTNER: ['',Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    if (this.storage.partner.selectedPartner !== null) {
      this.edit = false
      this.form.patchValue(this.storage.partner.partners[this.storage.partner.selectedPartner.index]);
    }
    this.initValue = this.form.value
    this.onChanges()
  }
  cancel(){
    if(this.change){
      this.storage.cancelDialog().then((result) => {
        if (result.value) {
          this.goBack()
        }
      })
    }else {
      this.goBack()
    }
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {    
      this.change = (JSON.stringify(val) !== JSON.stringify(this.initValue))      
    });
  }
  goBack(): void {
    this.activeModal.dismiss();
  }
  save(): void {
    if (!this.edit) {
      let hand = this.form.value;
      this.request.update('api/partners/'+hand.PARTNER_ID, hand).subscribe((response) => {
          this.storage.partner.partners[this.storage.partner.selectedPartner.index] = hand;
          this.goBack();
      });
    } else {
      this.request.post('api/partners', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.partner.partners.unshift(response.data[0]);
          this.goBack()
        }
      });
    }
  }

}

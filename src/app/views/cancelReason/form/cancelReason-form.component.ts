import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-CancelReason',
  templateUrl: './CancelReason-form.component.html',
  styleUrls: ['./CancelReason-form.component.css']
})
export class CancelReasonFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      CANCEL_REASON_ID: [''],
      CANCEL_REASON: ['', Validators.required],
      CANCEL_REASON_TYPE: ['', Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {


    if (this.storage.cancelReason.selectedCancelReason !== null) {
      this.edit = false
      this.form.patchValue(this.storage.cancelReason.cancelReasons[this.storage.cancelReason.selectedCancelReason.index]);
    }
    this.initValue = this.form.value
    this.onChanges()
  }
  cancel() {
    if (this.change) {
      this.storage.cancelDialog().then((result) => {
        if (result.value) {
          this.goBack()
        }
      })
    } else {
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
      this.request.update('api/cancelreasons/' + hand.CANCEL_REASON_ID, hand).subscribe((response) => {
        this.storage.cancelReason.cancelReasons[this.storage.cancelReason.selectedCancelReason.index] = hand;
        this.goBack();
        this.form.reset()
      });

    } else {
      this.request.post('api/cancelreasons', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.cancelReason.cancelReasons.unshift(response.data[0]);
          this.form.reset()
          this.goBack()
        }
      });
    }
  }

}

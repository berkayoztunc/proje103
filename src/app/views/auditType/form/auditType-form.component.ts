import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auditType',
  templateUrl: './auditType-form.component.html',
  styleUrls: ['./auditType-form.component.css']
})
export class AuditTypeFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  initValue = {};
  change = false;
  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      AUDIT_TYPE_ID: [''],
      EXPLANATION: ['', Validators.required],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
   

    if (this.storage.auditType.selectedAuditType !== null) {
      this.edit = false;
      this.form.patchValue(this.storage.auditType.auditTypes[this.storage.auditType.selectedAuditType.index]);
    }
    this.initValue = this.form.value;
    this.onChanges();
  }
  cancel() {
    if (this.change) {
      this.storage.cancelDialog().then((result) => {
        if (result.value) {
          this.goBack();
        }
      });
    } else {
      this.goBack();
    }
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.change = (JSON.stringify(val) !== JSON.stringify(this.initValue));
    });
  }
  goBack(): void {
    this.activeModal.dismiss();
  }
  save(): void {
    if (!this.edit) {
      const hand = this.form.value;
      this.request.update('api/audit-types/' + hand.AUDIT_TYPE_ID, hand).subscribe((response) => {
        if (response) {
          this.storage.auditType.auditTypes[this.storage.auditType.selectedAuditType.index]['EXPLANATION'] = hand['EXPLANATION'];
          this.goBack();
          this.form.reset();
        }
      });

    } else {
      this.request.post('api/audit-types', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.auditType.auditTypes.unshift(response.data[0]);
          this.goBack();
        }
      });
    }
  }

}

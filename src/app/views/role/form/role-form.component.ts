import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Role',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  initValue = {};
  change = false;
  constructor(private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      ROLE_ID: [''],
      ROLE: ['', Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    if (this.storage.role.selectedRole !== null) {
      this.edit = false;
      this.form.patchValue(this.storage.role.roles[this.storage.role.selectedRole.index]);
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
      hand.id = hand.ROLE_ID;
      this.request.update('api/roles/' + hand.ROLE_ID, hand).subscribe((response) => {
        this.storage.role.roles[this.storage.role.selectedRole.index] = hand;
        this.goBack();
        this.form.reset();
      });

    } else {
      this.request.post('api/roles', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.role.roles.unshift(response.data[0]);
          this.goBack();
        }

      });
    }
  }

}

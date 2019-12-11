import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue = {};
  roles$ =  [];
  constructor(
    private activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {

    this.form = this.fb.group({
      USER_ID: [''],
      NAME: ['', Validators.required],
      EMAIL: ['', [Validators.email, Validators.required]],
      ACTIVE: [false],
      ROLE_ID : [null, Validators.required]
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {

    if (this.storage.user.selectedUser !== null) {
      this.edit = false;
      this.form.patchValue(this.storage.user.selectedUser.item);
    }
    this.request.get('api/roles').subscribe((response) => {
      this.roles$ = response.data;
    });
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
    if (this.form.valid) {
      if (!this.edit) {
        const hand = this.form.value;
        hand.check = true;
        console.log(hand.ACTIVE);
        
        this.request.update('api/users/' + this.storage.user.selectedUser.item.USER_ID, hand).subscribe((response) => {
              this.storage.user.users[this.storage.user.selectedUser.index] = hand;
              this.goBack();
        });
      } else {
        this.request.post('api/users', this.form.value).subscribe((response) => {
          if (response) {
            response.data[0].check = true;
            this.storage.user.users.unshift(response.data[0]);
            this.goBack();
          }
        });
      }
    }

  }

}

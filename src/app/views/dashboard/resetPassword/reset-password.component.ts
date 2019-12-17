import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})

export class ResetPasswordComponent {
  form: FormGroup;
  constructor(
    private translate: TranslateService,
    public request: RequestService,
    public storage: StoreService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      PASSWORD: ['', Validators.required],
      NEW_PASSWORD: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]],
      CONIFIRM_PASSWORD: ['',[ Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]],
    }, { validator: this.checkPasswords });
  }
  get validator() { return this.form.controls; }

  save(): void {
    this.request.update('api/users/change-password/' + this.storage.auth.user.USER_ID, this.form.value).subscribe((response) => {
      if (response) {
        this.storage.auth.user.PASSWORD_LOCKED = false;
        this.activeModal.dismiss();
      }
    });
  }
  cancel() {
    this.activeModal.dismiss();
  }
  checkPasswords(group: FormGroup) {
    const pass = group.get('NEW_PASSWORD').value;
    const old_password = group.get('PASSWORD').value;
    const confirmPass = group.get('CONIFIRM_PASSWORD').value;
    return pass === confirmPass ? pass === old_password ? { oldSame: true } : null : { notSame: true };
  }

}

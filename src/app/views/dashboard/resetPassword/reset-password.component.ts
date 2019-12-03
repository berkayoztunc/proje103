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
  form : FormGroup;
  constructor(
    private translate: TranslateService,
    private request: RequestService,
    private storage: StoreService,
    private fb: FormBuilder,
    private activeModal : NgbActiveModal
  ){
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      old_password: ['',Validators.required],
      password: ['', Validators.required],
      confirim_password: ['',Validators.required],
    }, {validator: this.checkPasswords });
  }
  save() : void {
    this.request.post('user/update-password',this.form.value).subscribe((response)=>{
      if(response){
        this.activeModal.dismiss();
      }
    })
  }
  checkPasswords(group: FormGroup) { 
  let pass = group.get('password').value;
  let old_password = group.get('old_password').value;
  let confirmPass = group.get('confirim_password').value;
  return pass === confirmPass ? pass === old_password ? { oldSame: true }  : null : { notSame: true }     
}
 
}

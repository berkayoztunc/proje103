import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Channel',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.css']
})
export class ChannelFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  change = false;
  initValue= {};
  constructor(private activeModal : NgbActiveModal,private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      PARTNER_CHANNEL_ID: [''],
      PARTNER_CHANNEL: ['',Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    if (this.storage.channel.selectedChannel !== null) {
      this.edit = false
      this.form.patchValue(this.storage.channel.channels[this.storage.channel.selectedChannel.index]);
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
      this.request.update('api/partnerchannels/'+hand.PARTNER_CHANNEL_ID, hand).subscribe((response) => {
          this.storage.channel.channels[this.storage.channel.selectedChannel.index] = hand;
          this.goBack();
      });
    } else {
      this.request.post('api/partnerchannels', this.form.value).subscribe((response) => {
        if (response) {
          this.storage.channel.channels.unshift(response.data[0]);
          this.form.reset()
          this.goBack()
        }
      });
    }
  }

}

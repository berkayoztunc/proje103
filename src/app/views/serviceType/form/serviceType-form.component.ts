import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ServiceType',
  templateUrl: './serviceType-form.component.html',
  styleUrls: ['./serviceType-form.component.css']
})
export class ServiceTypeFormComponent implements OnInit {
  form: FormGroup;
  edit = true;
  initValue = {};
  change = false;
  constructor(private activeModal: NgbActiveModal, private request: RequestService, private storage: StoreService, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      SERVICE_TYPE_ID: [''],
      SERVICE_TYPE: ['', Validators.required],
      PREFIX: ['', Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    /*this.edit = this.route.snapshot.paramMap.get('BENEFIT_ID') == null 
    
   if(!this.edit){
     const routeServiceTypeId = +this.route.snapshot.paramMap.get('BENEFIT_ID');
    
     this.storage.serviceType.getServiceType(routeServiceTypeId).subscribe(ServiceType=>{        
       this.form.patchValue(ServiceType);                    
     })
     // request search from http
   }*/

    if (this.storage.serviceType.selectedServiceType !== null) {
      this.edit = false
      this.form.patchValue(this.storage.serviceType.serviceTypes[this.storage.serviceType.selectedServiceType.index]);
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
      this.request.update('api/servicetypes/'+ hand.SERVICE_TYPE_ID, hand).subscribe((response) => {
        this.storage.serviceType.serviceTypes[this.storage.serviceType.selectedServiceType.index] = hand;
      });
      this.goBack();
      this.form.reset()
    } else {
      this.request.post('api/servicetypes', this.form.value).subscribe((response) => {
        this.storage.serviceType.serviceTypes.unshift(response.data[0]);
        this.goBack()
      });
    }
  }

}

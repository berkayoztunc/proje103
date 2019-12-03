import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { iif } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-BenefitPack',
  templateUrl: './BenefitPack-form.component.html',
  styleUrls: ['./BenefitPack-form.component.css']
})
export class BenefitPackFormComponent implements OnInit {
  form: FormGroup;
  edit=true;
  change = false;
  initValue= {};
  constructor(private activeModal : NgbActiveModal,private request : RequestService, private storage : StoreService,private fb: FormBuilder,private route: ActivatedRoute, private location: Location    ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      BENEFIT_PACK_ID : [''],
      BENEFIT_PACK: ['',Validators.required],
      ACTIVE: [''],
    });
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
   
    if(this.storage.benefitPack.selectedBenefitPack !== null){
      this.edit = false
      this.form.patchValue(this.storage.benefitPack.benefitPacks[this.storage.benefitPack.selectedBenefitPack.index]);      
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
    if(!this.edit){
        let hand = this.form.value;
        this.request.update('api/benefitpacks/'+hand.BENEFIT_PACK_ID,hand).subscribe(
          (response) =>{
              this.storage.benefitPack.benefitPacks[this.storage.benefitPack.selectedBenefitPack.index] = hand
              this.form.reset()
              this.goBack();
          }
        );
       
    }else{
      this.request.post('api/benefitpacks',this.form.value).subscribe((response)=>{
        if(response){
          this.storage.benefitPack.benefitPacks.unshift(response.data[0]);
          this.form.reset()
          this.goBack()
        }
      } );
    }
  }

}

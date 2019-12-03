import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-role-user-sync',
  templateUrl: './role-user-sync.component.html',
  styleUrls: ['./role-user-sync.component.css']
})
export class RoleUserSyncComponent implements OnInit {
  form: FormGroup;
  constructor(private request : RequestService, private storage : StoreService,private fb: FormBuilder,private route: ActivatedRoute, private location: Location    ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      items  :  this.fb.array([])
    });
  }
  get allItems(): FormArray {
    return this.form.get('items') as FormArray;
 } 
  ngOnInit() {
    
    if(this.storage.role.selectedRole == null){
      this.goBack()
    }
    else{
      this.request.get('api/roleUser',{
          ROLE_ID : this.storage.role.selectedRole.item.ROLE_ID
      }).subscribe((response)=>{
        response.forEach((o, i) => {
          const control =  this.fb.group(o)
          this.allItems.push(control);          
        });

      })
    }
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
      console.log({
        ROLE_ID : this.storage.role.selectedRole.item.ROLE_ID,
        permissions : this.form.value.items
      })
  }

}

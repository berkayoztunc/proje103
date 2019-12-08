import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-role-permission-sync',
  templateUrl: './role-permission-sync.component.html',
  styleUrls: ['./role-permission-sync.component.css']
})
export class RolePermissionSyncComponent implements OnInit {
  form: FormGroup;
  data  = [];
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
      /*
      this.request.get('api/rolePermission',{
              ROLE_ID : this.storage.role.selectedRole.item.ROLE_ID
          })
      */
      this.request.get( 'api/roles/permissions/'+this.storage.role.selectedRole.item.ROLE_ID ).subscribe((response)=>{
        this.data = response.data; //this.transformer() 
        response.data.forEach((o, i) => {  
          const control =  this.fb.group({check : o.check,key:o.key})
          this.allItems.push(control);  
        });
        this.form.patchValue({items:response.data})
        
      })
    }
  }
  transformer(item){
    let hand = [];
    item.forEach((item,index)=>{
      let permissionSplit = item.key.split('.')
      if(!hand[permissionSplit[0]]){
        hand[permissionSplit[0]] = []
      }
      hand[permissionSplit[0]].push(item)
    })    
    return hand
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
      this.request.update('api/roles/permissions/'+this.storage.role.selectedRole.item.ROLE_ID , {PERMISSIONS : JSON.stringify(this.form.value.items)}).subscribe(()=>{
        this.goBack()
      })
  }

}

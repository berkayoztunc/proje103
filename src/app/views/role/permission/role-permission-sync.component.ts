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
  groups  = [];
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
      this.request.get( 'api/rolePermission' ).subscribe((response)=>{
        this.data = this.transformer(response) 
        this.groups = Object.keys(this.data)
        response.forEach((o, i) => {
          const control =  this.fb.group(o)
          this.allItems.push(control);          
        });

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
    console.log(hand);
    
    return hand
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

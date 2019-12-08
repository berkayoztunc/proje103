import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup  } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  searchData = [];
  form:FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService,
    public storage: StoreService,
    private fb: FormBuilder
  ) {


    this.createForm();
  }
  select(item){
    this.storage.policy.selectedCustomer = item;
  }
  selectPolicy(item){
    this.storage.policy.selectedPolicy = item;    
  }
  goPolicy(item){
    this.storage.policy.selectedPolicy = item;
    this.router.navigate(['/dashboard/policy/overview']);
  }
  clearForm(){
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
  }
  createForm() {
    this.form = this.fb.group({
      LAST_NAME: [null],
      POLICY_NUMBER: [null],
      EXTERNAL_POLICY_NUMBER: [null],
      NATIONAL_ID: [null],
      MOBILE_PHONE: [null],
    });
  }
  get validator() { return this.form.controls; }
 
  ngOnInit() {
    this.searchData = this.storage.policy.searchData
  }
  search(){
    this.request.post('api/policy/search',this.form.value).subscribe((response)=>{
     this.storage.policy.searchData = response.data
     this.searchData = response.data
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  searchData = [];
  form: FormGroup;
  isSearched= false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  select(item) {
    this.storage.policy.selectedCustomer = item;
    this.storage.policy.selectedPolicy = null
    
  }
  selectPolicy(item) {
    this.storage.policy.selectedPolicy = item;
  }
  goPolicy(item) {
    this.storage.policy.selectedPolicy = item;
    this.storage.policy.inPolicy = true;
    this.storage.policy.searchQuery = this.form.value;
    this.router.navigate(['/dashboard/policy/overview']);
  }
  clearForm() {
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
    this.storage.policy.inPolicy = false;
    this.storage.policy.searchQuery  = null;
    this.searchData = [];
    this.isSearched = false;
    this.form.reset();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      LAST_NAME: [''],
      POLICY_NUMBER: [''],
      EXTERNAL_POLICY_NUMBER: [''],
      NATIONAL_ID: [''],
      MOBILE_PHONE: [''],
    });
  }
  get LAST_NAME() {
    return this.form.get('LAST_NAME'); 
   }
  get MOBILE_PHONE() {
   return this.form.get('MOBILE_PHONE'); 
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    
    if (this.storage.policy.inPolicy) {
      this.searchData = this.storage.policy.searchData;
      this.form.patchValue(this.storage.policy.searchQuery)
    } else {
      this.searchData = [];
      this.form.reset();
      this.createForm();
    }
  }
  search() {
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
    this.storage.policy.inPolicy = false;
    this.searchData = [];
    this.isSearched = false;
    this.request.post('api/policy/search', this.form.value).subscribe((response) => {
      this.isSearched = true;

      if (response) {
        this.storage.policy.searchData = response.data;
        this.searchData = response.data;
        this.request.error = null;
      } else {
        this.searchData = []
        this.request.onTheGo = false;
      }

    });
  }
}

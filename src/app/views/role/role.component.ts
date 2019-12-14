import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RequestService } from 'src/app/services/request.service';
import { RoleFormComponent } from './form/role-form.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  data=  [];
  search = '';
  detail = false;
  tabelOnInit = true;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.getData();
    }
    this.data = this.storage.role.roles;
  }
  searchClick() {
    this.storage.role.roles.map((item) => {
      const check = item.ROLE.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });
  }
  refresh(){
    this.getData()
  }
  select(item, index) {
    this.storage.role.selectedRole = {item, index};
    this.modalService.open(RoleFormComponent);
  }
  viewPermission(item) {
    this.storage.role.selectedRole = {item};
    this.route.navigate(['dashboard/role/permission']);

  }
  create() {
    this.storage.role.selectedRole = null;
    this.modalService.open(RoleFormComponent);
  }
  getData(): void {
    this.request.get( 'api/roles' )
    .subscribe(response => {
      this.data = this.storage.role.roles = response.data.map((item) => {
        item.check = true;
        return item;
      });
    });

  }

  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/roles/' + item.ROLE_ID).subscribe(() => {
          this.storage.role.roles.splice(i, 1);
          this.data = this.storage.role.roles;
        });
      }
    });
  }

}

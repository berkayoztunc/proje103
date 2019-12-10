import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './form/user-form.component';
import { TranslateService } from '@ngx-translate/core';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  user: User;
  search = '';
  detail = false;
  tabelOnInit = true;
  constructor(
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
    private translate: TranslateService,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {
    if (this.tabelOnInit) {
      this.getUsers();
    }
    this.users = this.storage.user.users;


  }
  searchClick() {
    this.storage.user.users.map((item) => {
      const check = item.NAME.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 || item.EMAIL.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });



  }
  select(item, index) {
    this.storage.user.selectedUser = { item, index };
    this.modalService.open(UserFormComponent);
  }
  unlock(item, i): void {
    this.storage.cancelDialog(this.translate.translations[this.translate.currentLang].email_send).then((value) => {
      if (value.value) {
        this.request.update('api/users/unlock/' + item.USER_ID, {EMAIL: item.EMAIL}).subscribe(() => {
          this.storage.successDialog();
      });
      }
    });

  }
  create() {
    this.storage.user.selectedUser = null;
    this.modalService.open(UserFormComponent);
  }
  getUsers(): void {
    this.request.get( 'api/users')
      .subscribe(response => {
        this.storage.user.users = response.data.map((item, index) => {
          item.check = true;
          return item;
        });
        this.users = this.storage.user.users;
      });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/users/' + item.USER_ID).subscribe(() => {
          this.storage.user.users.splice(i, 1);
        });
      }
    });
  }

}

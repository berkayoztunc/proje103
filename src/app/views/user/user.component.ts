import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './form/user-form.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  user: User;
  search= '';
  detail = false;
  tabelOnInit = true;
  constructor(
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit():void {
    if (this.tabelOnInit) {
      this.searchUsers()
    }
    this.users = this.storage.user.users;


  }
  searchClick() {
    if(this.search != ''){
      this.users = this.users.filter((item) =>{
        return item.NAME.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 || item.EMAIL.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      });
    }else{
      this.users = this.storage.user.users
    }
    
  }
  select(item, index) {
    this.storage.user.selectedUser = { item, index };
    this.modalService.open(UserFormComponent)
  }
  view(item) {

  }
  unlock(item,i):void{
    this.request.update('api/users/unlock/'+item.USER_ID,{EMAIL:item.EMAIL}).subscribe(()=>{

    })
  }
  create() {
    this.storage.user.selectedUser = null;
    this.modalService.open(UserFormComponent)
  }
  searchUsers(): void {
    this.request.get( 'api/users')
      .subscribe(response => {
        this.users = this.storage.user.users = response.data
      });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/users/' + item.USER_ID).subscribe(() => {
          this.storage.user.users.splice(i, 1);
          this.users = this.storage.user.users
        });
      }
    })
  }

}

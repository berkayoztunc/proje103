import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './resetPassword/reset-password.component';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  fragment = [];
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
    private modalService: NgbModal,
  ) {

    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((item) => {
        const hand = router.url.split('/');
        const bla = [];
        hand.forEach((item, index) => {
          bla.push({
            name: hand[index + 1] ? hand[index + 1] : item,
            url: hand[index + 1] ? (bla[index - 1] ? bla[index - 1].url : item) + '/' + hand[index + 1] : null
          });
        });
        bla.pop();
        this.fragment = bla;

      });

  }

  ngOnInit() {
    if (this.storage.auth.user.PASSWORD_LOCKED) {
      this.modalService.open(ResetPasswordComponent);
    }
  }
  setLanguage(lang) {
    this.storage.language.selectedLanguage = lang;
    this.translate.use(lang);
  }
  passwordReset() {
    this.modalService.open(ResetPasswordComponent);
  }
  signout() {
    this.router.navigate(['login']);
    this.storage.auth = {
      token: '',
      user: {
        USER_ID : null,
        NAME: '',
        PASSWORD_LOCKED : false
      },
      permissions: {},
      mapedPermissions : []
    };
  }
}

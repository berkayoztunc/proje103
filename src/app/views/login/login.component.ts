import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  model: any = {
    email: 'ilhan@tema.com.tr',
    password: 'Tema0100',
    application: 'pp'
  };
  loading = false;
  returnUrl: string;
  errorlogging = false;
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
  ) { }

  ngOnInit() {

  }

  login(f): void {
    if (f.valid) {
      this.loading = true;
      this.errorlogging = false;
      this.request.post('api/users/login', { EMAIL: this.model.email, PASSWORD: this.model.password })
        .subscribe(
          resp => {
            if (resp) {              
              this.storage.auth.token = resp.token
              let tokenParse = jwt_decode(this.storage.auth.token);
              this.storage.auth.permissions = resp.data
              this.storage.auth.mapedPermissions = resp.data.map((item)=>{
                return item.PERMISSION
              })
              this.storage.auth.user = tokenParse.user;
              
              this.router.navigate(['../dashboard']);
            }
          });
    }
  }
  async forgetMyPassword() {
    const { value: email } = await Swal.fire({
      title: this.translate.translations[this.translate.currentLang]['swal']['forgetpassword']['title'],
      input: 'email',
      inputPlaceholder: this.translate.translations[this.translate.currentLang]['swal']['forgetpassword']['placeholder']
    })

    if (email) {
      Swal.fire(`Entered email: ${email}`)
      //TODO : Burda e posta sıfırlamayla ilgili bir bilgi atılıcak. ve karşılığında sistem swal açılıcak
    }
  }

}

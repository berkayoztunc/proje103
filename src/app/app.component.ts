import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from './services/store.service';
import { RequestService } from './services/request.service';
import { SystemErrorComponent } from './components/system-error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  detail= [];
  
  constructor(private translate : TranslateService,config: NgbModalConfig,storage :StoreService,request :RequestService, modal : NgbModal){
    translate.addLangs(storage.language.allLanguage);
    translate.use(storage.language.selectedLanguage);
    config.backdrop = 'static';
    config.keyboard = false;
    request.systemError.subscribe(()=>{
      modal.open(SystemErrorComponent)
    })
  }
  keys(item){
    return Object.keys(item);
  }
}

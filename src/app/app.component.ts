import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  detail= [];
  
  constructor(private translate : TranslateService,config: NgbModalConfig){
    translate.addLangs(['en','tr']);
    translate.use('tr');
    config.backdrop = 'static';
    config.keyboard = false;
  }
  keys(item){
    return Object.keys(item);
  }
}

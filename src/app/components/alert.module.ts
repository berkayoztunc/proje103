import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { LoaderComponent } from './loader.component';



@NgModule({
  declarations: [AlertComponent,LoaderComponent],
  imports: [
    CommonModule,
  ],
  exports : [AlertComponent,LoaderComponent],
  
})
export class AlertModule { }

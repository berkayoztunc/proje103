import { NgModule } from '@angular/core';
import { ChannelComponent } from './channel.component';
import { CommonModule } from '@angular/common';
import { ChannelRoutingModule } from './channel-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [ChannelComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ChannelRoutingModule,
  ]
})
export class ChannelModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RequestService } from 'src/app/services/request.service';
import { Channel } from 'src/app/models/channel';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChannelFormComponent } from './form/channel-form.component';

@Component({
  selector: 'app-Channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  Channels : Channel[];
  Channel : Channel;
  search='';
  detail = false;
  tabelOnInit = true;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,private request : RequestService,private storage : StoreService,private route : Router) {

  }

  ngOnInit() {
    if(this.tabelOnInit){
      this.searchChannels()
    }
    this.Channels = this.storage.channel.channels;

  }
  searchClick(){
    if(this.search != ''){
      this.Channels = this.Channels.filter((item) =>{
        return item.PARTNER_CHANNEL.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0 
      });
    }else{
      this.Channels = this.storage.channel.channels;
    }
    this.searchChannels();
  }  
  select(item,index){
    this.storage.channel.selectedChannel = {item,index};
    this.modalService.open(ChannelFormComponent)

  }
  create(){
    this.storage.channel.selectedChannel = null;
    this.modalService.open(ChannelFormComponent)
  }
  searchChannels(): void {
    this.request.get('api/partnerchannels')
    .subscribe(response => {
      this.Channels = this.storage.channel.channels = response.data
    });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete('api/users/' + item.PARTNER_CHANNEL_ID).subscribe(() => {
          this.storage.channel.channels .splice(i, 1);
          this.Channels = this.storage.channel.channels 
        });
      }
    })
  }

}

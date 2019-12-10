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
  data: Channel[];
  search = '';
  detail = false;
  tabelOnInit = true;
  url = 'api/partnerchannels';
  idFlag = 'PARTNER_CHANNEL_ID';
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal, public request: RequestService, public storage: StoreService, private route: Router) {

  }

  ngOnInit() {
    if (this.tabelOnInit) {
      this.searchChannels();
    }
    this.data = this.storage.channel.channels;

  }
  searchClick() {
    this.storage.channel.channels.map((item) => {
      const check = item.PARTNER_CHANNEL.toLocaleLowerCase().search(this.search.toLocaleLowerCase()) >= 0;
      return item.check = check;
    });    
  }
  select(item, index) {
    this.storage.channel.selectedChannel = { item, index };
    this.modalService.open(ChannelFormComponent);

  }
  create() {
    this.storage.channel.selectedChannel = null;
    this.modalService.open(ChannelFormComponent);
  }
  searchChannels(): void {
    this.request.get(this.url)
      .subscribe(response => {
        if (response) {
          this.data = this.storage.channel.channels = response.data.map((item) => {
            item.check = true;
            return item;
          });
        }
      });

  }
  delete(item, i): void {
    this.storage.deleteDialog().then((result) => {
      if (result.value) {
        this.request.delete(this.url + '/' + item[this.idFlag]).subscribe(() => {
          this.storage.channel.channels.splice(i, 1);
          this.data = this.storage.channel.channels;
        });
      }
    });
  }

}

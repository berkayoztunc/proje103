import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})

export class PolicyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService,
    private storage: StoreService,
    private modalService: NgbModal,
  ) {



  }

  ngOnInit() {

  }

}

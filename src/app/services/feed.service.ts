import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { StoreService } from './store.service';
import { Country } from '../models/country';

@Injectable({ providedIn: 'root' })
export class FeedService {

    constructor(private request : RequestService,private storage : StoreService) { }

    feedCountyies() : void{
        this.request.get( 'api/country').subscribe((response)=>{
            this.storage.country.countrys = response as Country[];
        })
    }
}
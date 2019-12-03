import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
export class StoreService {
    
    auth = {
        token : '',
        user : {
            NAME: ''
        },
        permissions : {
        }   
    }
    benefit =  {
        benefits: [],
        selectedBenefit: null
    }
    benefitPack =  {
        benefitPacks: [],
        selectedBenefitPack: null
    }
    cancelReason= {
        cancelReasons: [],
        selectedCancelReason: null
    }
    city ={
        cityies: [],
        selectedCity: null
    }
    country=  {
        countrys: [],
        selectedCountry: null,
    }
    partner= {
        partners: [],
        selectedPartner: null
    }
    product= {
        products: [],
        selectedProduct: null
    }
    role= {
        roles: [],
        selectedRole: null
    }
    serviceType= {
        serviceTypes: [],
        selectedServiceType: null
    }
    user= {
        users: [],
        selectedUser: null
    }
    channel = {
        channels : [],
        selectedChannel : null,
    }
    currency = {
        currencyies : [],
        selectedCurrency : null
    }
    constructor( private translate: TranslateService,) { }
    //** dialogs */

    cancelDialog(){
        return Swal.fire({
            text: this.translate.translations[this.translate.currentLang]['form_change'],
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:  this.translate.translations[this.translate.currentLang]['dialog_yes']
          })
    }
    deleteDialog(){
        return Swal.fire({
            text: this.translate.translations[this.translate.currentLang]['delete_item'],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:  this.translate.translations[this.translate.currentLang]['dialog_yes'],
            cancelButtonText : this.translate.translations[this.translate.currentLang]['dialog_no']
          })
    }
}

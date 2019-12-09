import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
export class StoreService {
    

    policy = {
        searchData : [],
        selectedCustomer : null,
        selectedPolicy : null,
        historys : []
    }
    auth = {
        token : '',
        user : {
            NAME: '',
            PASSWORD_LOCKED : false
        },
        permissions : {
        },
        mapedPermissions :[] 
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
    language = {
        allLanguage : ['en','tr'],
        selectedLanguage : 'tr'
    }
    constructor( private translate: TranslateService,) { }
    //** dialogs */

    cancelDialog(val = null){
        return Swal.fire({
            text: val == null ? this.translate.translations[this.translate.currentLang]['form_change'] : val,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:  this.translate.translations[this.translate.currentLang]['dialog_yes'],
            cancelButtonText : this.translate.translations[this.translate.currentLang]['dialog_no']

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
    successDialog(){
        return Swal.fire({
            text: this.translate.translations[this.translate.currentLang]['success_info'],
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:  this.translate.translations[this.translate.currentLang]['dialog_yes'],
          })
    }
}

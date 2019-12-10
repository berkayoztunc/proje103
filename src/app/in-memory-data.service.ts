import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Permission } from './models/permission';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, USER_ID: 11, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true },
      { id: 12, USER_ID: 12, NAME: 'Dr Ni3123ce', EMAIL: 'test@test.com', ACTIVE: false },
      { id: 12, USER_ID: 12, NAME: 'Dr Ni3123ce', EMAIL: 'test@test.com', ACTIVE: false },
      { id: 12, USER_ID: 12, NAME: 'Dr Ni3123ce', EMAIL: 'test@test.com', ACTIVE: false },
      { id: 12, USER_ID: 12, NAME: 'Dr Ni3123ce', EMAIL: 'test@test.com', ACTIVE: false },
    ];
    const benefits = [
      { id: 11, BENEFIT_ID: 11, CAPTION: 'Dr Nice', BODY: 'test@test.com', ACTIVE: true },
      { id: 12, BENEFIT_ID: 12, CAPTION: 'Dr Nic21312e', BODY: 'test123123@test.com', ACTIVE: true },
    ];
    const role = [
      { id: 13, ROLE_ID: 11, ROLE: 'user', ACTIVE: true },
      { id: 11, ROLE_ID: 11, ROLE: 'admin', ACTIVE: true }
    ];
    const country = [
      { id: 1, COUNTRY_ID: 1, COUNTRY: 'TURKEY', COUNTY_CODE: 'TR', PHONE_CODE: '+90', ACTIVE: true},
      { id: 2, COUNTRY_ID: 2, COUNTRY: 'UK', COUNTY_CODE: 'EN', PHONE_CODE: '+1', ACTIVE: true}
    ];
    const city = [
      { id: 1, CITY_ID: 1, COUNTRY_ID: 1, CITY: 'IZMIR', CITY_CODE: '35', ACTIVE: true},
      { id: 2, CITY_ID: 2, COUNTRY_ID: 1, CITY: 'ISTANBUL', CITY_CODE: '35', ACTIVE: true},
    ];
    const partner = [
      { id: 1, PARTNER_ID: 11, PARTNER: 'berkay', ACTIVE: true },
      { id: 2, PARTNER_ID: 12, PARTNER: 'ilhan', ACTIVE: true }
    ];
    const channel = [
      { id: 1, CHANNEL_ID: 11, CHANNEL: 'atm', ACTIVE: true },
      { id: 1, CHANNEL_ID: 11, CHANNEL: 'telefon', ACTIVE: true },
    ];
    const serviceType = [
      { id: 1, SERVICE_TYPE_ID: 11, SERVICE_TYPE: 'Roket ile', ACTIVE: true },
      { id: 1, SERVICE_TYPE_ID: 11, SERVICE_TYPE: 'Atom ile', ACTIVE: true },
    ];
    const currency = [
      { id: 1, CURRENCY_ID: 11, CURRENCY: 'tl', ACTIVE: true },
      { id: 1, CURRENCY_ID: 12, CURRENCY: 'EURO', ACTIVE: true },
    ];
    const cancelReason = [
      { id: 1, CANCEL_REASON_ID: 11, CANCEL_REASON : 'berkay hasta', CANCEL_REASON_TYPE: 'berkay', ACTIVE: true },
      { id: 2, CANCEL_REASON_ID: 12, CANCEL_REASON : 'ilhan hasta', CANCEL_REASON_TYPE: 'ilhan', ACTIVE: true },
    ];
    const benefitPack = [
      { id: 1, BENEFIT_PACK_ID: 11, BENEFIT_PACK: 'berkay', ACTIVE: true },
      { id: 2, BENEFIT_PACK_ID: 11, BENEFIT_PACK: 'ilhan', ACTIVE: true }
    ];
    const rolePermission = [
      { id : 1, key: 'user.create', check: true},
      { id : 1, key: 'role.create', check: true},
      { id : 2, key: 'user.update', check: false},
      { id : 2, key: 'role.update', check: false},
      { id : 3, key: 'user.delete', check: false},
      { id : 4, key: 'user.browse', check: true},
    ];
    const roleUser = [
      { id: 11, USER_ID: 11, NAME: 'Dr Nice', EMAIL: 'test@test.com', ACTIVE: true , check : true},
      { id: 12, USER_ID: 12, NAME: 'Dr Ni3123ce', EMAIL: 'test@test.com', ACTIVE: false , check : false},
    ];
    const product =  [];
    const singin = {
      token : 'token',
      permission : Permission
    };
    return {singin, rolePermission, currency, product, users, benefits, role, country, city , partner, cancelReason, benefitPack, channel, serviceType};
  }

  genId(heroes: User[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.USER_ID)) + 1 : 1;
  }


}

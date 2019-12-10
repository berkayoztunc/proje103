import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorTranformatorService {
  shema;
  header = [];
  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
      this.shema = data;
    });
   }

  public getJSON() {
      return this.http.get('./assets/config.json');
  }
   errorsbag(data, type) {
    const shcmaType = this.shema.fileType[type];
    this.header = this.shema.fileType[type].colm;
    const errorArray = [];
    for (let i = 0; i < data.length; i++) {

      for (let j = 0; j <  this.header.length; j++) {

          if (data[i][shcmaType.colm[j]].validation !== undefined) {
            errorArray.push(data[i][shcmaType.colm[j]].validation);
          }
        }
     }
    return errorArray;
  }
   convert(data, type) {
      // ŞEMA KULLANIMI
      const shcmaType = this.shema.fileType[type];
      // ŞEMA KULLANIMI
      for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < shcmaType.colm.length; j++) {
              let handColum = data[i][shcmaType.colm[j]];
              handColum = this.typeBinder(handColum, shcmaType.rule[shcmaType.colm[j]].type);
              if (shcmaType.rule[shcmaType.colm[j]].hasOwnProperty('former')) {
                // let fn = new ("value",shcmaType.rule[shcmaType.colm[j]].former);
                // handColum = fn(handColum)
              }
              data[i][shcmaType.colm[j]] = handColum;
          }
      }
      return data;
  }
   typeBinder(value, type) {
      const fn = type.split(':');
      switch (fn[0]) {
        case 'string':
          return value.toString();
          break;
        case 'integer':

            if (value.charAt(',') > 0) {
              value = value.replace(',', '.');
            }
            if (!isNaN(value)) {
              return parseFloat(value);

            }
            return value;
            break;
        case 'date':
            return moment(value, fn[1], true);
            break;
        default:
          return value.toString();
          break;
      }
  }

   validate(value, type, satir, key) {
      const s = type.split('|');
      const validationArray = [];

      for (let i = 0; i < s.length; i++) {
        const func = s[i].split(':');
        let fn = null;
        let param = null;
        if (func.length > 1) {
          fn = func[0];
          param = func[1];
        } else {
          fn = func[0];
          param = null;
        }
        const info = this[fn](key, value, param, satir);
        if (!info.valid) {
          validationArray.push(info);
        }

      }
      return validationArray;
  }
   validateWithTransform(data, type) {
      const convertedData = this.convert(data, type);
      // ŞEMA KULLANIMI
      const shcmaType = this.shema.fileType[type];
      this.header = this.shema.fileType[type].colm;

      // ŞEMA KULLANIMI

      for (let i = 0; i < convertedData.length; i++) {
        for (let j = 0; j < shcmaType.colm.length; j++) {
            const value = convertedData[i][shcmaType.colm[j]];
            const handColum = this.validate(value, shcmaType.rule[shcmaType.colm[j]].validation, i, shcmaType.colm[j]);
            if (handColum.length > 0) {
              convertedData[i][shcmaType.colm[j]] = {
                value,
                validation : handColum,
              };
            } else {
              convertedData[i][shcmaType.colm[j]] = {
                value,
              };
            }


        }
    }
      return convertedData;
  }

  // validasyon metodları ve mesaj alanı bu alanda abi mesaj bölümü ve title alanı i18n kullanarak çevirebilriz. bunuda güncellerim ben
   emun(key, value, param, row) {
    const arr = param.split(',');
    if (arr.indexOf(value) !== -1) {
      return {
        title : null,
        valid : true,
        msg : null
      };
    } else {
      return {
        title: 'Aralık doğrulama',
        valid : false,
        msg : row  + ' satırındaki ' + key + ' kolonu  şu aralıklarda olmalıdır'
      };
    }
  }
   number(key, value, param, row) {
    if (!isNaN(value)) {
      return {
        title : null,
        valid : true,
        msg : null
      };
    } else {
      return {
        title: 'Rakam doğrulama',
        valid : false,
        msg : row  + ' satırındaki ' + key + ' kolonu  rakam  olmalıdır'
      };
    }
  }
   date(key, value, param, row) {
    const a = moment(value, param, true);
    if (a.isValid()) {
      return {
        title : null,
        valid : true,
        msg : null
      };
    } else {
      return {
        title: 'Tarih doğrulama',
        valid : false,
        msg : row  + ' satırındaki ' + key + ' kolonu  tarih formatı ' + param + ' olmalıdır'
      };
    }
  }
   required(key, value, param, row) {
      if (value == null || value == undefined ) {
        return {
          title : 'Zorunlu alan',
          valid : false,
          msg : row  + ' satırındaki ' + key + '  kolonu  boş gelemez'
        };
      } else {
        return {
          title: null,
          valid : true,
          msg : null
        };

      }
  }
   match(key, value, param, row) {
      const re = RegExp(param) ;
      if (re.test(value)) {
        return {
          title: null,
          valid : true,
          msg : null
        };
      } else {
        return {
          title : 'Eşleşme doğruluğu',
          valid : false,
          msg : row  + ' satırındaki ' + key + ' kolonu  belirlenen eşleşme mantığında olmalıdır'
        };
      }

  }
   email(key, value, param, row) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(value)) {
      return {
        title : null,
        valid : true,
        msg : null
      };
    } else {
      return {
        title: 'Email doğrulama',
        valid : false,
        msg : row  + ' satırındaki ' + key + ' kolonu  email olmalıdır'
      };
    }
  }
   min(key, value, param, row) {

    if (typeof(value) === 'number') {
      if (value > param) {
        return {
          title: null,
          valid : true,
          msg : null
        };
      } else {
        return {
          title: 'En az sayı uzunluğu',
          valid : false,
          msg : row  + ' satırındaki ' + key + ' kolonu en az ' + param + ' sayı olmalıdır'
        };
      }
    } else {
      if (value.length > param) {
        return {
          title: null,
          valid : true,
          msg : null
        };
      } else {
        return {
          title: 'En az karakter uzunluğu',
          valid : false,
          msg : row  + ' satırındaki ' + key + ' kolonu en az ' + param + ' karakter olmalıdır'
        };
      }
    }

  }
   max(key, value, param, row) {
    if (typeof(value) === 'number') {
      if (value < param) {
        return {
          title: null,
          valid : true,
          msg : null
        };
      } else {
        return {
          title: 'En fazla sayı uzunluğu',
          valid : false,
          msg : row  + ' satırındaki ' + key + ' kolonu en az ' + param + ' sayı fazla olamaz'
        };
      }
    } else {
      if (value.length < param) {
        return {
          title: null,
          valid : true,
          msg : null
        };
      } else {
        return {
          title: 'En fazla karakter uzunluğu',
          valid : false,
          msg : row  + ' satırındaki ' + key + ' kolonu en az ' + param + ' karakterden fazla olamaz'
        };
      }
    }
  }
}

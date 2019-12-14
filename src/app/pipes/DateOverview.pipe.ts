import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'dateOverview' })
export class DateOverviewPipe implements PipeTransform {
    transform(date:string): string {
        let reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/g;
        var patt = new RegExp(reg);
        var res = patt.test(date);
        if(res){
            let transformer = new Date(date);
            let dater = new DatePipe("tr-TR").transform(transformer,'dd/MM/yyy');
            return dater
        }
        return date
    }
}
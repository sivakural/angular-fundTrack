import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterString'
})
export class ConverterStringPipe implements PipeTransform {

  transform(value: [], ...args: any): string {
    let stringData = '';
    value.forEach((data: any, induxum: number) => {
      stringData = stringData.includes(data.categorey) ? stringData : stringData.concat(data.categorey);
      if (data.subcategories && data.subcategories.length) {
        stringData = stringData.concat('(');
        data.subcategories.forEach((subValue: any, index: number, datum: []) => {
          stringData =  stringData.concat(subValue.subcategorey + ((index == (datum.length - 1)) ? '' : ', '));
        });
        stringData = stringData.concat(')');
      }
      stringData = stringData.concat(((value.length - 1) == induxum) ? '' : ',');
    });
    stringData = stringData.replace(/,,/g, ',');
    return stringData;
  }

}

@Pipe({
  name: 'converterNumber'
})
export class ConverterNumberPipe implements PipeTransform {

  transform(value: [], ...args: any): any {
    let numberData = 0;
    value.forEach((data: any) => {
      if (data.subcategories && data.subcategories.length) {
        data.subcategories.forEach((subValue: any) => {
          numberData += subValue.subcategorey_value;
        });
      } else {
        numberData += data.categorey_value;
      }
    })
    return numberData;
  }

}

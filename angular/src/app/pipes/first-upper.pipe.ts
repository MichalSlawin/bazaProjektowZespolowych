import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpper'
})
export class FirstUpperPipe implements PipeTransform {

  transform(value: string, args?: any): string {
      value = value.replace(/_/g, ' ');
      return value.charAt(0).toUpperCase() + value.slice(1);
  }

}

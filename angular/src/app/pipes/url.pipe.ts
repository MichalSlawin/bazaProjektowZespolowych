import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string, args?: any): string {
      var pat_https = /^https?:\/\//i;
      var pat_http = /^https?:\/\//i;
      if (!(pat_https.test(value) || pat_http.test(value)))
      {
          value = 'http://' + value;
      }
    return value;
  }

}

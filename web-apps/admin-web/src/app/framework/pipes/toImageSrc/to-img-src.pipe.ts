import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toImgSrc',
})
export class ToImgSrc implements PipeTransform {
  transform(uri: string, ...args: unknown[]): string {
    return `${environment.apiUri}photos/${uri}`;
  }
}

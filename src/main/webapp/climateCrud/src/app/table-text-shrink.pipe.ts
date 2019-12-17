import { Pipe, PipeTransform } from '@angular/core';
/*
 * Subs the value
 * Takes an length argument that defaults to 50.
*/
@Pipe({name: 'textShrink'})
export class TextShrinkPipe implements PipeTransform {
  transform(value: string, length: number = 50): string {
    const postfix: string = value.length > length ? '...' : '';
    return value.trim().substr(0, length).concat(postfix);
  }
}

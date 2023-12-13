import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surname',
})
export class SurnamePipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ')[1];
  }
}

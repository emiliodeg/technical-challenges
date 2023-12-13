import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDirection',
})
export class SortDirectionPipe implements PipeTransform {
  transform(value: 'asc' | 'desc'): string {
    return value === 'asc' ? '⬆️' : '⬇️';
  }
}

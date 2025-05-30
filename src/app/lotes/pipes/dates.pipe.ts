import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const dates = value.split(',');
    return dates.map(date => new Date(date).toLocaleDateString()).join(', ');
  }
}

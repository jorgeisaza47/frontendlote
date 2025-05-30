import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  // Crear una instancia de DatePipe
  private datePipe = new DatePipe('es-ES');

  transform(value: string | string[], format: string = 'MMMM d yyyy'): string | string[] {
    // Si el valor es un array de fechas
    if (Array.isArray(value)) {
      return value.map(fecha => this.datePipe.transform(fecha, format) || fecha);
    }

    // Si el valor es una sola fecha
    return this.datePipe.transform(value, format) || value;
  }
}

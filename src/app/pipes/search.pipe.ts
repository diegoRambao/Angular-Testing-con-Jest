import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[] | null, search: string): any[] {
    if (!value) return [];

    const regexp = new RegExp(search, 'i');
    const properties = Object.keys(value[0]);
    
    const valuesFilter = value.filter((item: any) => {
      return properties.some((property) => regexp.test(item[property]));
    });

    return valuesFilter;
  }
}

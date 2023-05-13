import { Pipe, PipeTransform } from '@angular/core';
import { sortBy, uniq } from 'lodash';

@Pipe({
  name: 'preview',
  standalone: true,
})
export class PreviewPipe implements PipeTransform {
  transform(values: Array<string | number>): string {
    const vals = sortBy(uniq(values));
    if (vals.length > 6) {
      vals.splice(2, vals.length - 4, '...');
    }
    return vals.join(', ');
  }
}

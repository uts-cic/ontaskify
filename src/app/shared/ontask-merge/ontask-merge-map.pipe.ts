import { Pipe, PipeTransform, computed, inject } from '@angular/core';
import { flatten } from 'flat';
import { at, omit } from 'lodash';
import { OntaskService } from '../ontask.service';

@Pipe({
  name: 'ontaskMergeMap',
  standalone: true,
})
export class OntaskMergeMapPipe<T> implements PipeTransform {
  private rows = inject(OntaskService).rows;
  private keys = computed(() => new Set(this.rows().map(({ id }) => id)));
  transform(entities: T[], path: string): OntaskMergeMap {
    return entities.reduce((map, entity) => {
      const key = at(entity as {}, [path])[0] as OntaskValue;
      this.keys().has(key) && map.set(key, omit(flatten(entity), path));
      return map;
    }, new Map());
  }
}

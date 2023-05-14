import { Pipe, PipeTransform } from '@angular/core';
import { flatten } from 'flat';
import { at, omit } from 'lodash';

@Pipe({
  name: 'ontaskMergeMap',
  standalone: true,
})
export class OntaskMergeMapPipe implements PipeTransform {
  transform(entities: any[], path: string): OntaskMergeMap {
    return new Map(
      entities.map((entity) => [
        at(entity, [path])[0] as OntaskValue,
        omit(flatten(entity), path),
      ])
    );
  }
}

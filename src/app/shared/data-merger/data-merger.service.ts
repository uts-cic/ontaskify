import { Injectable, Type, WritableSignal, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { flatten } from 'flat';
import { at, omit } from 'lodash';
import { OntaskService } from '../ontask.service';
import { DataMergerDialogComponent } from './data-merger-dialog/data-merger-dialog.component';
import { DataMergerSelectionComponent } from './data-merger-selection/data-merger-selection.component';

export interface DataFetcher {
  loading: WritableSignal<boolean>;
  id: WritableSignal<string>;
  cols: WritableSignal<string[]>;
  rows: WritableSignal<OntaskMergeMap | null>;
  error?: WritableSignal<string | null>;
}

export interface DataMerger {
  title: string;
  component: Type<DataFetcher>;
}

@Injectable({
  providedIn: 'root',
})
export class DataMergerService {
  private bottomSheet = inject(MatBottomSheet);
  private dialog = inject(MatDialog);
  private ontaskService = inject(OntaskService);

  openMergerSelection(dataMergers: DataMerger[]) {
    this.bottomSheet.open(DataMergerSelectionComponent, { data: dataMergers });
  }

  openMerger(merger: DataMerger) {
    this.dialog
      .open(DataMergerDialogComponent, { data: merger })
      .afterClosed()
      .subscribe(
        (mergeData) => mergeData && this.ontaskService.mergeData(mergeData)
      );
  }

  transform<T>(entities: T[], path: string, prop: string): OntaskMergeMap {
    const keys = new Set(this.ontaskService.rows()?.map((row) => row[prop]));
    return entities.reduce((map, entity) => {
      const key = at(entity as {}, [path])[0] as OntaskRowValue;
      if (keys.has(key)) {
        map.set(key, omit(flatten(entity), path));
      }
      return map;
    }, new Map());
  }
}

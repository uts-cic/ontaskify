import { inject, Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { OntaskMergeComponent } from './ontask-merge/ontask-merge.component';
import { OntaskService } from './ontask.service';

export interface DoColumnMerge {
  doColumnMerge(): Observable<ColumnMerge>;
}

export type ColumnMerge = {
  columns: string[];
  rows: Map<number, OntaskRowData>;
};

@Injectable({
  providedIn: 'root',
})
export class OntaskMergeService {
  private dialog = inject(MatDialog);
  private ontaskService = inject(OntaskService);

  private loading$ = new BehaviorSubject<boolean>(false);
  private ready$ = new BehaviorSubject<boolean>(false);

  setLoading(status: boolean) {
    this.loading$.next(status);
  }

  setReady(status: boolean) {
    this.ready$.next(status);
  }

  getLoadingAsObservable() {
    return this.loading$.asObservable();
  }

  getReadyAsObservable() {
    return this.ready$.asObservable();
  }

  addColumns(
    title: string,
    component: Type<DoColumnMerge>
  ): Observable<string[]> {
    const dialogRef = this.dialog.open(OntaskMergeComponent, {
      data: { title, component },
    });

    return dialogRef.afterClosed().pipe(
      tap(() => this.reset()),
      map((val) => val || { columns: null, rows: null }),
      tap(({ columns }) => columns && this.ontaskService.addColumns(columns)),
      tap(({ rows }) => rows && this.ontaskService.mergeData(rows)),
      map(({ columns }) => columns || [])
    );
  }

  reset() {
    this.loading$.next(false);
    this.ready$.next(false);
  }
}

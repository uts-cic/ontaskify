import { inject, Injectable, InjectionToken, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';
import { OntaskMergeComponent } from './ontask-merge.component';

export interface DoColumnMerge {
  doColumnMerge(): Observable<string[]>;
}

export type ColumnMerge = {
  type: string;
  component: Type<DoColumnMerge>;
  title: string;
};

export const ONTASK_MERGERS = new InjectionToken<ColumnMerge[]>(
  'OntaskMergers'
);

@Injectable({
  providedIn: 'root',
})
export class OntaskMergeService {
  private dialog = inject(MatDialog);
  private mergers = inject(ONTASK_MERGERS);

  private loading$ = new BehaviorSubject<boolean>(false);
  private ready$ = new BehaviorSubject<boolean>(false);

  private dialogRef?: MatDialogRef<OntaskMergeComponent>;
  private instance?: DoColumnMerge;

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

  addColumns(mergeType: string, columns: string[]) {
    const { type, title, component } = this.mergers.find(
      ({ type }) => type === mergeType
    )!;
    this.dialogRef = this.dialog.open(OntaskMergeComponent, {
      data: { title },
    });

    const container = this.dialogRef.componentInstance.componentContainer;
    this.instance = container.createComponent(component).instance;

    return this.dialogRef.afterClosed().pipe(
      tap(() => this.reset()),
      filter((data: string[]) => !!data?.length),
      map((data: string[]) => Array.from(new Set([...columns, ...data])))
    );
  }

  merge() {
    this.loading$.next(true);
    this.instance
      ?.doColumnMerge()
      .pipe(take(1))
      .subscribe((columns) => this.dialogRef?.close(columns));
  }

  reset() {
    this.loading$.next(false);
    this.ready$.next(false);

    this.dialogRef = undefined;
    this.instance = undefined;
  }
}

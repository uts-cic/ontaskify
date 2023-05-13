import { Injectable, signal } from '@angular/core';
import { assign, difference, zipObject } from 'lodash';
import * as Papa from 'papaparse';

export type MergeData = {
  id: string;
  cols: string[];
  rows: OntaskMergeMap;
};

@Injectable({
  providedIn: 'root',
})
export class OntaskService {
  columns = signal<string[]>([]);
  rows = signal<OntaskRow[]>([]);

  mergeData({ id, cols, rows }: MergeData) {
    this.columns.mutate((columns) =>
      columns.push(...difference(cols, columns))
    );
    this.rows.mutate((rs) =>
      rs.forEach((row) => assign(row, rows.get(row[id])))
    );
  }

  reset() {
    this.columns.set([]);
    this.rows.set([]);
  }

  exportToCsv(filename: string) {
    const columns = this.columns();
    const headers = zipObject(columns, columns);
    const data = [headers, ...this.rows()];
    const csvData = Papa.unparse(data, { header: false, columns });
    const blob = new Blob([csvData], { type: 'text/csv' });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  }
}

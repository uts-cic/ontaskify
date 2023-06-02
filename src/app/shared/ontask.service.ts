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
  columns = signal<string[] | null>(null);
  rows = signal<OntaskRow[] | null>(null);

  mergeData({ id, cols, rows }: MergeData) {
    this.columns.mutate((columns) =>
      columns?.push(...difference(cols, columns))
    );
    this.rows.mutate((rs) =>
      rs?.forEach((row) => assign(row, rows.get(row[id])))
    );
  }

  reset() {
    this.columns.set(null);
    this.rows.set(null);
  }

  exportToCsv(filename: string) {
    const columns = this.columns();
    const rows = this.rows();
    if (!columns || !rows) return;

    const headers = zipObject(columns, columns);
    const numericalColumns = columns.filter((column) =>
      rows.some((row) => typeof row[column] === 'number')
    );
    rows.forEach((row) =>
      numericalColumns.forEach((col) => (row[col] = row[col] || 0))
    );
    const data = [headers, ...rows];
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

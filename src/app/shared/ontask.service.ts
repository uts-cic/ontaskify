import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OntaskService {
  private columnDefs$ = this.getInitColumnDefs();
  private students$ = this.getInitStudents();

  addColumnDefs(columnDefs: Map<string, string>) {
    const current = this.columnDefs$.value;
    return this.columnDefs$.next(new Map([...current, ...columnDefs]));
  }

  getColumns() {
    return Array.from(this.columnDefs$.value.keys());
  }

  getColumnsAsObservable() {
    return this.columnDefs$.pipe(
      map((columnDefs) => Array.from(columnDefs.keys()))
    );
  }

  getColumnDefsAsObservable() {
    return this.columnDefs$.asObservable();
  }

  mergeData(mergeMap: Map<number, { [prop: string]: string | number | null }>) {
    const students = this.students$.value.map((student) => ({
      ...student,
      ...mergeMap.get(student.id),
    }));
    this.students$.next(students);
  }

  setStudents(students: OntaskStudent[]) {
    this.students$.next(students);
  }

  getStudentsAsObservable() {
    return this.students$.asObservable();
  }

  exportToCsv(filename: string, columns?: string[]) {
    if (!columns) {
      columns = this.getColumns();
    }

    const columnDefs = this.columnDefs$.value;
    const headers = columns.reduce(
      (head: { [prop: string]: string }, column: string) => {
        head[column] = columnDefs.get(column)!;
        return head;
      },
      {} as { [prop: string]: string }
    );
    const data = [headers, ...this.students$.value];
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

  reset() {
    this.columnDefs$ = this.getInitColumnDefs();
    this.students$ = this.getInitStudents();
  }

  private getInitColumnDefs() {
    return new BehaviorSubject<Map<string, string>>(
      new Map([
        ['id', 'ID'],
        ['cid', 'Student ID'],
        ['firstName', 'First name'],
        ['lastName', 'Last name'],
        ['email', 'Email'],
      ])
    );
  }

  private getInitStudents() {
    return new BehaviorSubject<OntaskStudent[]>([]);
  }
}

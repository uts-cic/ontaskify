import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OntaskService {
  private columns$ = this.getInitColumns();
  private students$ = this.getInitStudents();

  addColumns(columns: string[]) {
    const cols = this.columns$.value.concat(columns);
    return this.columns$.next(cols);
  }

  getColumns() {
    return this.columns$.value;
  }

  getColumnsAsObservable() {
    return this.columns$.asObservable();
  }

  mergeData(mergeMap: Map<number, { [prop: string]: string | number | null }>) {
    console.log(mergeMap);
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

    const headers = columns.reduce(
      (head: { [prop: string]: string }, column: string) => {
        head[column] = column;
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
    this.columns$ = this.getInitColumns();
    this.students$ = this.getInitStudents();
  }

  private getInitColumns() {
    return new BehaviorSubject<string[]>([
      'id',
      'student_id',
      'first_name',
      'last_name',
      'email',
    ]);
  }

  private getInitStudents() {
    return new BehaviorSubject<OntaskStudent[]>([]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { difference } from 'lodash';
import { OntaskCsvComponent } from 'src/app/shared/ontask-csv/ontask-csv.component';
import {
  OntaskMergeComponent,
  OntaskMerger,
} from 'src/app/shared/ontask-merge/ontask-merge.component';
import { MaterialModule } from '../../shared/material.module';
import { OntaskService } from '../../shared/ontask.service';
import MERGERS from '../mergers';
import { CanvasCourseService } from '../services/canvas-course.service';

@Component({
  selector: 'app-canvas-course',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, OntaskCsvComponent],
  templateUrl: './canvas-course.component.html',
  styleUrls: ['./canvas-course.component.scss'],
})
export class CanvasCourseComponent implements OnInit, OnDestroy {
  private dialog = inject(MatDialog);
  private canvasCourseService = inject(CanvasCourseService);
  private ontaskService = inject(OntaskService);

  course = inject(ActivatedRoute).snapshot.data['course'] as Course;
  students = inject(ActivatedRoute).snapshot.data['students'] as Student[];

  columns = this.ontaskService.columns;
  rows = this.ontaskService.rows;
  availableColumns = ['id'];

  mergers = MERGERS;

  constructor() {
    effect(() =>
      this.availableColumns.push(
        ...difference(this.columns(), this.availableColumns)
      )
    );
  }

  ngOnInit() {
    this.canvasCourseService.course.set(this.course);

    this.columns.set(['student_id', 'first_name', 'last_name', 'email']);
    this.rows.set(
      this.students.map((student: Student): OntaskRow => {
        const id = student.id;
        const student_id = student['sis_user_id'];
        const splitName = student['sortable_name'].split(', ');
        const last_name = splitName[0];
        const first_name = splitName[1];
        const emailCandidate = student['email'] || student['login_id'];
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCandidate)
          ? emailCandidate
          : null;
        return { id, student_id, first_name, last_name, email };
      })
    );
  }

  ngOnDestroy() {
    this.canvasCourseService.reset();
    this.ontaskService.reset();
  }

  updateColumns(columns: string[]) {
    this.columns.set(columns);
  }

  addColumns(merger: OntaskMerger) {
    this.dialog
      .open(OntaskMergeComponent, { data: merger })
      .afterClosed()
      .subscribe(
        (mergeData) => mergeData && this.ontaskService.mergeData(mergeData)
      );
  }
}

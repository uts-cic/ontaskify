import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DataMergerService,
  OntaskCsvComponent,
  OntaskService,
} from '@app/shared';
import { difference } from 'lodash';
import { MaterialModule } from '../material.module';
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
  @Input({ required: true }) course!: CanvasCourse;

  private canvasCourseService = inject(CanvasCourseService);
  private dataMergerService = inject(DataMergerService);
  private ontaskService = inject(OntaskService);

  columns = this.ontaskService.columns;
  rows = this.ontaskService.rows;
  availableColumns = ['id'];

  constructor() {
    effect(() =>
      this.availableColumns.push(
        ...difference(this.columns(), this.availableColumns)
      )
    );
  }

  async ngOnInit() {
    this.canvasCourseService.course.set(this.course);
    this.columns.set(['student_id', 'first_name', 'last_name', 'email']);

    const students = await this.canvasCourseService.getStudents();

    this.rows.set(
      students.map((student: CanvasUserProfile): OntaskRow => {
        const id = student.id;
        const student_id = student['sis_user_id'];
        const splitName = student['sortable_name'].split(', ');
        const last_name = splitName[0];
        const first_name = splitName[1];
        const emailCandidate = student['email'] || student['login_id'];
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCandidate)
          ? emailCandidate
          : '';
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

  addColumns() {
    this.dataMergerService.openMergerSelection(MERGERS);
  }
}

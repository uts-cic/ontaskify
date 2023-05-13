import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { flatten } from 'flat';
import { omit } from 'lodash';
import { OntaskMerge } from 'src/app/shared/ontask-merge/ontask-merge.component';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasCourseService } from '../../services/canvas-course.service';

@Component({
  selector: 'app-canvas-columns-enrolments',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-enrolments.component.html',
  styleUrls: ['./canvas-columns-enrolments.component.scss'],
})
export class CanvasColumnsEnrolmentsComponent implements OnInit, OntaskMerge {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);

  async ngOnInit() {
    try {
      const enrolments = await this.canvasCourseService.getEnrollments();
      this.rows.set(
        new Map(
          enrolments.map((enrolment) => [
            enrolment.user_id,
            omit(flatten(enrolment), 'user_id'),
          ])
        )
      );
      this.loading.set(false);
    } catch (e) {
      console.log(e);
      this.loading.set(false);
      const err = e as HttpErrorResponse;
      this.error.set(err.error?.error?.message || err.message);
    }
  }
}

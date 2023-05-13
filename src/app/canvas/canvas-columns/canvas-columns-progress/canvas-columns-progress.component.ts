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
  selector: 'app-canvas-columns-progress',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-progress.component.html',
  styleUrls: ['./canvas-columns-progress.component.scss'],
})
export class CanvasColumnsProgressComponent implements OnInit, OntaskMerge {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);

  async ngOnInit() {
    try {
      const summaries = await this.canvasCourseService.getBulkUserProgress();
      this.rows.set(
        new Map(
          summaries.map((summary) => [summary.id, omit(flatten(summary), 'id')])
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

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import {
  DataFetcher,
  DataMergerService,
  SelectColumnsComponent,
} from '@app/shared';
import { CanvasCourseService } from '../../services/canvas-course.service';

@Component({
  selector: 'app-canvas-columns-enrolments',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-enrolments.component.html',
  styleUrls: ['./canvas-columns-enrolments.component.scss'],
})
export class CanvasColumnsEnrolmentsComponent implements OnInit, DataFetcher {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);
  private dataMergerService = inject(DataMergerService);

  async ngOnInit() {
    try {
      const enrolments = await this.canvasCourseService.getEnrollments();
      this.rows.set(
        this.dataMergerService.transform(enrolments, 'user_id', 'id')
      );
      this.loading.set(false);
    } catch (e) {
      this.loading.set(false);
      const err = e as HttpErrorResponse;
      this.error.set(err.error?.error?.message || err.message);
    }
  }
}

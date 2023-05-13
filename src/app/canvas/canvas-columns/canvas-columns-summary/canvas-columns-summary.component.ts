import { CommonModule } from '@angular/common';
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
  selector: 'app-canvas-columns-summary',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-summary.component.html',
  styleUrls: ['./canvas-columns-summary.component.scss'],
})
export class CanvasColumnsSummaryComponent implements OnInit, OntaskMerge {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);

  async ngOnInit() {
    const summaries = await this.canvasCourseService.getStudentSummaries();
    this.rows.set(
      new Map(
        summaries.map((summary) => [summary.id, omit(flatten(summary), 'id')])
      )
    );
    this.loading.set(false);
  }
}

import { CommonModule } from '@angular/common';
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
  selector: 'app-canvas-columns-summary',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-summary.component.html',
  styleUrls: ['./canvas-columns-summary.component.scss'],
})
export class CanvasColumnsSummaryComponent implements OnInit, DataFetcher {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);
  private dataMergerService = inject(DataMergerService);

  async ngOnInit() {
    const summaries = await this.canvasCourseService.getStudentSummaries();
    this.rows.set(this.dataMergerService.transform(summaries, 'id', 'id'));
    this.loading.set(false);
  }
}

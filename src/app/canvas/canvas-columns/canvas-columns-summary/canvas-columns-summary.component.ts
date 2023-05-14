import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { OntaskMergeMapPipe } from 'src/app/shared/ontask-merge/ontask-merge-map.pipe';
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
  private ontaskMergeMapPipe = inject(OntaskMergeMapPipe);

  async ngOnInit() {
    const summaries = await this.canvasCourseService.getStudentSummaries();
    this.rows.set(this.ontaskMergeMapPipe.transform(summaries, 'id'));
    this.loading.set(false);
  }
}

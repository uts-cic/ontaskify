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
import { ProgressService } from 'src/app/shared/progress/progress.service';
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
  private ontaskMergeMapPipe = inject(OntaskMergeMapPipe);
  private progress = inject(ProgressService).progress;

  async ngOnInit() {
    try {
      const progress = await this.canvasCourseService.getBulkUserProgress();
      this.rows.set(this.ontaskMergeMapPipe.transform(progress, 'id'));
      this.loading.set(false);
    } catch (err) {
      this.loading.set(false);
      this.error.set((err as Error).message);
      this.progress.set(null);
    }
  }
}

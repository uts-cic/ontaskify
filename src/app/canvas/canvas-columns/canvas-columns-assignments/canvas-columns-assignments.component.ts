import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { OntaskMergeMapPipe } from 'src/app/shared/ontask-merge/ontask-merge-map.pipe';
import { OntaskMerge } from 'src/app/shared/ontask-merge/ontask-merge.component';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasCourseService } from '../../services/canvas-course.service';

@Component({
  selector: 'app-canvas-columns-assignments',
  standalone: true,
  imports: [CommonModule, MaterialModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-assignments.component.html',
  styleUrls: ['./canvas-columns-assignments.component.scss'],
})
export class CanvasColumnsAssignmentsComponent implements OnInit, OntaskMerge {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);
  private ontaskMergeMapPipe = inject(OntaskMergeMapPipe);

  assignments: WritableSignal<CanvasAssignment[] | null> = signal(null);
  assignment: WritableSignal<CanvasAssignment | null> = signal(null);

  constructor() {
    effect(
      async () => {
        const assignment = this.assignment();
        if (assignment) {
          this.loading.set(true);
          const submissions =
            await this.canvasCourseService.getAssignmentSubmissions(
              assignment.id
            );
          this.rows.set(
            this.ontaskMergeMapPipe.transform(submissions, 'user_id')
          );
          this.loading.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }

  async ngOnInit() {
    const assignments = await this.canvasCourseService.getAssignments();
    this.assignments.set(assignments);
    this.loading.set(false);
  }
}

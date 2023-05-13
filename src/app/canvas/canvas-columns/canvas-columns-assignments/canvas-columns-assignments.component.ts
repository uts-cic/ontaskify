import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatten } from 'flat';
import { Observable, map, of, tap } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import {
  DoColumnMerge,
  OntaskMergeService,
} from 'src/app/shared/ontask-merge.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-columns-assignments',
  standalone: true,
  imports: [CommonModule, MaterialModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-assignments.component.html',
  styleUrls: ['./canvas-columns-assignments.component.scss'],
})
export class CanvasColumnsAssignmentsComponent implements DoColumnMerge {
  private ontaskMergeService = inject(OntaskMergeService);
  private canvasService = inject(CanvasService);
  private route = inject(ActivatedRoute);

  private course =
    this.route.snapshot.firstChild?.firstChild?.firstChild?.data['course'];

  assignments$ = this.canvasService
    .getAssignments(this.course.id)
    .pipe(tap(() => this.ontaskMergeService.setLoading(false)));

  rows$?: Observable<Map<number, OntaskRowData>>;

  setAssignment(assignment: CanvasAssignment) {
    this.rows$ = this.canvasService
      .getAssignmentSubmissions(this.course.id, assignment.id)
      .pipe(map((data) => this.getDataMap(data)))
      .pipe(tap((rows) => (this._rows = rows)));
  }

  private getDataMap(data: CanvasSubmission[]): Map<number, OntaskRowData> {
    return new Map(
      data.map((submission) => [submission.user_id!, flatten(submission)])
    );
  }

  private _rows!: Map<number, OntaskRowData>;
  private _columns: string[] = [];
  updateColumns(columns: string[]) {
    this._columns = columns;
    this.ontaskMergeService.setReady(columns.length > 0);
  }

  doColumnMerge() {
    return of({
      rows: this._rows,
      columns: this._columns,
    });
  }
}

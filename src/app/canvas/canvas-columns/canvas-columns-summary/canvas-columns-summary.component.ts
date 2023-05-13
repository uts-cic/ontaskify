import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatten } from 'flat';
import { omit } from 'lodash';
import { map, of, tap } from 'rxjs';
import {
  DoColumnMerge,
  OntaskMergeService,
} from 'src/app/shared/ontask-merge.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-columns-summary',
  standalone: true,
  imports: [CommonModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-summary.component.html',
  styleUrls: ['./canvas-columns-summary.component.scss'],
})
export class CanvasColumnsSummaryComponent implements DoColumnMerge {
  private ontaskMergeService = inject(OntaskMergeService);
  private canvasService = inject(CanvasService);
  private route = inject(ActivatedRoute);

  private course =
    this.route.snapshot.firstChild?.firstChild?.firstChild?.data['course'];

  rows$ = this.canvasService
    .getStudentSummaries(this.course.id)
    .pipe(map((summaries) => this.getDataMap(summaries)))
    .pipe(tap((rows) => (this._rows = rows)));

  private getDataMap(data: StudentSummary[]): Map<number, OntaskRowData> {
    return new Map(
      data.map((summary) => [summary.id, omit(flatten(summary), 'id')])
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

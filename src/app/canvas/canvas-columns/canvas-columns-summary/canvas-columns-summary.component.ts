import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import {
  DoColumnMerge,
  OntaskMergeService,
} from 'src/app/shared/ontask-merge/ontask-merge.service';
import { OntaskService } from 'src/app/shared/ontask.service';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-columns-summary',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './canvas-columns-summary.component.html',
  styleUrls: ['./canvas-columns-summary.component.scss'],
})
export class CanvasColumnsSummaryComponent
  implements AfterViewInit, DoColumnMerge
{
  private ontaskMergeService = inject(OntaskMergeService);
  private canvasService = inject(CanvasService);
  private ontaskService = inject(OntaskService);

  snapshot = inject(ActivatedRoute).snapshot;
  course = inject(ActivatedRoute).snapshot.data['course'] as Course;

  @ViewChild('columnsList', { static: false }) columnsList!: MatSelectionList;

  columnDefs = new Map<string, string>([
    ['pageViews', 'Page views'],
    ['pageViewsLevel', 'Page views level'],
    ['participations', 'Participations'],
    ['participationsLevel', 'Participations level'],
  ]);
  columns = Array.from(this.columnDefs.keys());

  ngAfterViewInit() {
    console.log(this.snapshot);
    this.columnsList.selectedOptions.changed.subscribe((selected) =>
      this.ontaskMergeService.setReady(!selected.source.isEmpty())
    );
  }

  doColumnMerge() {
    return this.canvasService
      .getStudentSummaries(
        this.snapshot.firstChild?.firstChild?.firstChild?.data['course'].id
      )
      .pipe(
        map((summaries) => {
          this.ontaskService.addColumnDefs(this.columnDefs);
          const summariesMap = this.getSummariesMap(summaries);
          this.ontaskService.mergeData(summariesMap);
          return this.columnsList.selectedOptions.selected.map(
            ({ value }) => value
          );
        })
      );
  }

  private getSummariesMap(summaries: StudentSummary[]) {
    return new Map<number, { [prop: string]: number }>(
      summaries.map((summary) => [
        summary.id,
        {
          pageViews: summary.page_views,
          pageViewsLevel: summary.page_views_level,
          participations: summary.participations,
          participationsLevel: summary.participations_level,
        },
      ])
    );
  }
}

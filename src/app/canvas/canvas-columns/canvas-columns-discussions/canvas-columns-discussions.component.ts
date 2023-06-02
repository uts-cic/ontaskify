import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { difference, max, min } from 'lodash';
import { MaterialModule } from 'src/app/shared/material.module';
import { OntaskMerge } from 'src/app/shared/ontask-merge/ontask-merge.component';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasCourseService } from '../../services/canvas-course.service';

@Component({
  selector: 'app-canvas-columns-discussions',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-discussions.component.html',
  styleUrls: ['./canvas-columns-discussions.component.scss'],
})
export class CanvasColumnsDiscussionsComponent implements OnInit, OntaskMerge {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);

  discussions: WritableSignal<CanvasDiscussionTopic[] | null> = signal(null);
  selected: WritableSignal<CanvasDiscussionTopic[]> = signal([]);
  entries = new Map<number, DiscussionEntry[]>();

  constructor() {
    effect(
      async () => {
        this.loading.set(true);

        const selected = this.selected().map(({ id }) => id);

        for (const id of difference(selected, [...this.entries.keys()])) {
          const discussionEntries =
            await this.canvasCourseService.getDiscussionEntries(id);
          this.entries.set(id, discussionEntries);
        }

        const getRowsFromEntries = (
          rows: OntaskMergeMap,
          entry: DiscussionEntry
        ) => {
          const row = (rows.get(entry.user_id) || {
            posts: 0,
            rating: 0,
            first_participation: undefined,
            last_participation: undefined,
          }) as {
            posts: number;
            rating: number;
            first_participation: string;
            last_participation: string;
          };
          row.posts++;
          row.rating += entry.rating_sum || 0;
          row.first_participation = min([
            row.first_participation,
            entry.created_at,
          ])!;
          row.last_participation = max([
            row.last_participation,
            entry.updated_at,
          ])!;
          rows.set(entry.user_id, row);

          entry.replies?.reduce(getRowsFromEntries, rows);

          return rows;
        };

        const rows = selected.length
          ? selected
              .flatMap((id) => this.entries.get(id)!)
              .reduce(getRowsFromEntries, new Map())
          : null;
        this.rows.set(rows);

        this.loading.set(false);
      },
      { allowSignalWrites: true }
    );
  }

  async ngOnInit() {
    this.loading.set(true);
    this.discussions.set(await this.canvasCourseService.getDiscussionTopics());
    this.loading.set(false);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { chain, filter, isEmpty, sortBy } from 'lodash';
import { ParseResult, parse } from 'papaparse';
import { MaterialModule } from 'src/app/shared/material.module';
import { OntaskMergeMapPipe } from 'src/app/shared/ontask-merge/ontask-merge-map.pipe';
import { OntaskMerge } from 'src/app/shared/ontask-merge/ontask-merge.component';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';

type Activity = {
  id: number;
  name: string;
  sortableName: string;
  studentId: number;
  sectionId: string;
  sectionName: string;
  courseId: string;
  courseName: string;
  contentType: string;
  contentName: string;
  timesViewed: number;
  timesParticipated: number;
  startDate: string;
  firstViewed: string;
  lastViewed: string;
};

const transformHeader = (header: string): string => {
  const headerMappings: { [key: string]: string } = {
    'Student Id': 'id',
    'Student Name': 'name',
    'Sortable Name': 'sortableName',
    'Student SIS ID': 'studentId',
    'Section Id': 'sectionId',
    'Section Name': 'sectionName',
    'Course Id': 'courseId',
    'Course Name': 'courseName',
    'Content Type': 'contentType',
    'Content Name': 'contentName',
    'Times Viewed': 'timesViewed',
    'Times Participated': 'timesParticipated',
    'Start Date': 'startDate',
    'First Viewed': 'firstViewed',
    'Last Viewed': 'lastViewed',
  };
  return headerMappings[header];
};

@Component({
  selector: 'app-canvas-columns-activity',
  standalone: true,
  imports: [CommonModule, MaterialModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-activity.component.html',
  styleUrls: ['./canvas-columns-activity.component.scss'],
})
export class CanvasColumnsActivityComponent implements OntaskMerge {
  loading: WritableSignal<boolean> = signal(false);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private ontaskMergeMapPipe = inject(OntaskMergeMapPipe);

  activity: WritableSignal<Activity[] | null> = signal(null);
  section: WritableSignal<string | null> = signal(null);
  contentType: WritableSignal<string | null> = signal(null);
  contentName: WritableSignal<string | null> = signal(null);

  sectionFiltered = computed(() =>
    filter(this.activity(), ['sectionId', this.section()])
  );
  contentTypeFiltered = computed(() =>
    filter(this.sectionFiltered(), ['contentType', this.contentType()])
  );
  contentNameFiltered = computed(() =>
    filter(this.contentTypeFiltered(), ['contentName', this.contentName()])
  );

  sections = computed(() => {
    const sections = this.activity()?.reduce(
      (map, activity: Activity) =>
        map.set(activity.sectionId, activity.sectionName),
      new Map<string, string>()
    );
    if (!sections?.size) return null;
    return new Map(sortBy(Array.from(sections), ([, value]) => value));
  });

  contentTypes = computed(() => {
    const sectionFiltered = this.sectionFiltered();
    return !isEmpty(sectionFiltered)
      ? chain(sectionFiltered).map('contentType').uniq().sort().value()
      : null;
  });

  contentNames = computed(() => {
    const contentTypeFiltered = this.contentTypeFiltered();
    return !isEmpty(contentTypeFiltered)
      ? chain(contentTypeFiltered).map('contentName').uniq().sort().value()
      : null;
  });

  resetSection = effect(
    () => {
      this.activity();
      this.section.set(null);
    },
    { allowSignalWrites: true }
  );

  resetContentType = effect(
    () => {
      this.section();
      this.contentType.set(null);
    },
    { allowSignalWrites: true }
  );

  resetContentName = effect(
    () => {
      this.contentType();
      this.contentName.set(null);
    },
    { allowSignalWrites: true }
  );

  fillInSection = effect(
    () => {
      const sections = this.sections();
      if (sections?.size === 1) {
        this.section.set(Array.from(sections.keys())[0]);
      } else if (!sections) {
        this.section.set(null);
      }
    },
    { allowSignalWrites: true }
  );

  fillInContentType = effect(
    () => {
      const contentTypes = this.contentTypes();
      if (contentTypes?.length === 1) {
        this.contentName.set(contentTypes[0]);
      } else if (!contentTypes?.length) {
        this.contentName.set(null);
      }
    },
    { allowSignalWrites: true }
  );

  fillInContentName = effect(
    () => {
      const contentNames = this.contentNames();
      if (contentNames?.length === 1) {
        this.contentName.set(contentNames[0]);
      } else if (!contentNames?.length) {
        this.contentName.set(null);
      }
    },
    { allowSignalWrites: true }
  );

  fillInRows = effect(
    () => {
      const name = this.contentName();
      const activities =
        name &&
        this.contentNameFiltered().map((activity) => {
          const row: OntaskRow = { id: activity.id };
          const data = activity as OntaskRow;
          const props = [
            'timesViewed',
            'timesParticipated',
            'startDate',
            'firstViewed',
            'lastViewed',
          ];
          for (const prop of props) {
            row[`${name} - ${prop}`] = data[prop];
          }
          return row;
        });
      this.rows.set(
        activities ? this.ontaskMergeMapPipe.transform(activities, 'id') : null
      );
    },
    { allowSignalWrites: true }
  );

  handleFileUpload(event: Event) {
    this.loading.set(true);
    const files: FileList | null = (event.target as HTMLInputElement).files;
    const file: File | null = files?.item(0) || null;
    if (file) {
      parse(file, {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
        transformHeader,
        complete: (result: ParseResult<Activity>) => {
          this.activity.set(result.data[0]?.id ? result.data : []);
          this.loading.set(false);
        },
      });
    } else {
      this.activity.set(null);
      this.loading.set(false);
    }
  }
}

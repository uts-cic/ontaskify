import { CommonModule } from '@angular/common';
import {
  Component,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { chain, filter, isEmpty } from 'lodash';
import { ParseResult, parse } from 'papaparse';
import { Observable, of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import {
  ColumnMerge,
  DoColumnMerge,
  OntaskMergeService,
} from 'src/app/shared/ontask-merge.service';
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
export class CanvasColumnsActivityComponent implements DoColumnMerge {
  private ontaskMergeService = inject(OntaskMergeService);

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

  sectionsLookup = computed(() =>
    this.activity()?.reduce(
      (map, activity: Activity) =>
        map.set(activity.sectionId, activity.sectionName),
      new Map<string, string>()
    )
  );

  sections = computed(() => {
    const entries = this.sectionsLookup()?.entries() || [];
    return chain([...entries])
      .sortBy(1)
      .map(0)
      .value();
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

  rows = computed(() =>
    this.contentNameFiltered().reduce(
      (map, activity) => map.set(activity.id, this.getRow(activity)),
      new Map<number, OntaskRowData>()
    )
  );

  private getRow(activity: Activity): OntaskRowData {
    const data = activity as OntaskRowData;
    const row: OntaskRowData = {};
    const name = this.contentName();
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
  }

  fillInSection = effect(
    () => {
      const sections = this.sections();
      if (sections?.length === 1) {
        this.section.set(sections[0]);
      }
    },
    { allowSignalWrites: true }
  );

  fillInContentType = effect(
    () => {
      const contentTypes = this.contentTypes();
      if (contentTypes?.length === 1) {
        this.contentName.set(contentTypes[0]);
      }
    },
    { allowSignalWrites: true }
  );

  fillInContentName = effect(
    () => {
      const contentNames = this.contentNames();
      if (contentNames?.length === 1) {
        this.contentName.set(contentNames[0]);
      }
    },
    { allowSignalWrites: true }
  );

  handleFileUpload(event: Event) {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    const file: File | null = files?.item(0) || null;
    if (file) {
      parse(file, {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
        transformHeader,
        complete: (result: ParseResult<Activity>) => {
          console.log(result);
          this.activity.set(result.data);
        },
      });
    }
  }

  private _columns: string[] = [];
  updateColumns(columns: string[]) {
    this._columns = columns;
    this.ontaskMergeService.setReady(columns.length > 0);
  }

  doColumnMerge(): Observable<ColumnMerge> {
    return of({
      rows: this.rows(),
      columns: this._columns,
    });
  }
}

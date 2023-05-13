import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OntaskMergeService } from 'src/app/shared/ontask-merge.service';
import { MaterialModule } from '../../shared/material.module';
import { OntaskService } from '../../shared/ontask.service';
import { CanvasColumnsActivityComponent } from '../canvas-columns/canvas-columns-activity/canvas-columns-activity.component';
import { CanvasColumnsAssignmentsComponent } from '../canvas-columns/canvas-columns-assignments/canvas-columns-assignments.component';
import { CanvasColumnsSummaryComponent } from '../canvas-columns/canvas-columns-summary/canvas-columns-summary.component';

@Component({
  selector: 'app-canvas-course',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './canvas-course.component.html',
  styleUrls: ['./canvas-course.component.scss'],
})
export class CanvasCourseComponent implements OnInit, OnDestroy, AfterViewInit {
  private ontaskService = inject(OntaskService);
  private ontaskMergeService = inject(OntaskMergeService);

  course = inject(ActivatedRoute).snapshot.data['course'] as Course;
  students = inject(ActivatedRoute).snapshot.data[
    'students'
  ] as OntaskStudent[];

  columns$ = this.ontaskService.getColumnsAsObservable();

  displayColumns: string[] = this.ontaskService
    .getColumns()
    .filter((col) => col !== 'id');
  filename: string = this.course.name + '.csv';

  dataSource = new MatTableDataSource<OntaskStudent>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private sub = this.ontaskService
    .getStudentsAsObservable()
    .subscribe((students) => (this.dataSource.data = students));

  ngOnInit() {
    this.ontaskService.setStudents(this.students);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.ontaskService.reset();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateDisplayColumns(columns: string[]) {
    this.displayColumns = columns;
  }

  addColumns(type: 'summary' | 'assignments' | 'activity') {
    const mergers = {
      summary: {
        component: CanvasColumnsSummaryComponent,
        title: 'Summary',
      },
      assignments: {
        component: CanvasColumnsAssignmentsComponent,
        title: 'Assignments',
      },
      activity: {
        component: CanvasColumnsActivityComponent,
        title: 'Activity',
      },
    };

    const { title, component } = mergers[type];

    this.ontaskMergeService
      .addColumns(title, component)
      .subscribe(
        (columns) => columns?.length && this.displayColumns.push(...columns)
      );
  }

  download() {
    this.ontaskService.exportToCsv(this.filename, this.displayColumns);
  }
}

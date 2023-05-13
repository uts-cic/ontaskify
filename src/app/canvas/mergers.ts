import { OntaskMerger } from '../shared/ontask-merge/ontask-merge.component';
import { CanvasColumnsActivityComponent } from './canvas-columns/canvas-columns-activity/canvas-columns-activity.component';
import { CanvasColumnsAssignmentsComponent } from './canvas-columns/canvas-columns-assignments/canvas-columns-assignments.component';
import { CanvasColumnsEnrolmentsComponent } from './canvas-columns/canvas-columns-enrolments/canvas-columns-enrolments.component';
import { CanvasColumnsProgressComponent } from './canvas-columns/canvas-columns-progress/canvas-columns-progress.component';
import { CanvasColumnsSummaryComponent } from './canvas-columns/canvas-columns-summary/canvas-columns-summary.component';

export default [
  {
    component: CanvasColumnsSummaryComponent,
    title: 'Summary',
  },
  {
    component: CanvasColumnsProgressComponent,
    title: 'Progress',
  },
  {
    component: CanvasColumnsEnrolmentsComponent,
    title: 'Enrolments',
  },
  {
    component: CanvasColumnsAssignmentsComponent,
    title: 'Assignments',
  },
  {
    component: CanvasColumnsActivityComponent,
    title: 'Activity',
  },
] as OntaskMerger[];

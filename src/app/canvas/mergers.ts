import { OntaskMerger } from '@app/shared';
import { CanvasColumnsActivityComponent } from './canvas-columns/canvas-columns-activity/canvas-columns-activity.component';
import { CanvasColumnsAssignmentsComponent } from './canvas-columns/canvas-columns-assignments/canvas-columns-assignments.component';
import { CanvasColumnsDiscussionsComponent } from './canvas-columns/canvas-columns-discussions/canvas-columns-discussions.component';
import { CanvasColumnsEnrolmentsComponent } from './canvas-columns/canvas-columns-enrolments/canvas-columns-enrolments.component';
import { CanvasColumnsProgressComponent } from './canvas-columns/canvas-columns-progress/canvas-columns-progress.component';
import { CanvasColumnsQuizzesComponent } from './canvas-columns/canvas-columns-quizzes/canvas-columns-quizzes.component';
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
    component: CanvasColumnsQuizzesComponent,
    title: 'Quizzes',
  },
  {
    component: CanvasColumnsDiscussionsComponent,
    title: 'Discussion topics',
  },
  {
    component: CanvasColumnsActivityComponent,
    title: 'Activity',
  },
] as OntaskMerger[];

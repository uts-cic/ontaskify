import { DataMerger } from '@app/shared';
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
    description:
      'Total page views, participations, on-time/late status for all homework submissions',
  },
  {
    component: CanvasColumnsProgressComponent,
    title: 'Progress',
    description:
      'Progress information for all users enrolled in the given course',
  },
  {
    component: CanvasColumnsEnrolmentsComponent,
    title: 'Enrolments',
    description: 'Enrolment details include current/final grade/score',
  },
  {
    component: CanvasColumnsAssignmentsComponent,
    title: 'Assignments',
    description: 'Submission information includes scores and grades',
  },
  {
    component: CanvasColumnsQuizzesComponent,
    title: 'Quizzes',
    description: 'Submission data includes score, data/time, state, attempt',
  },
  {
    component: CanvasColumnsDiscussionsComponent,
    title: 'Discussion topics',
    description:
      'Data includes number of posts, ratings received, first/last participation',
  },
  {
    component: CanvasColumnsActivityComponent,
    title: 'Activity',
    description: 'Upload CSV file exported from Canvas analytics module',
  },
] as DataMerger[];

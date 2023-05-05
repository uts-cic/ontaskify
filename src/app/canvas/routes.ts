import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { map } from 'rxjs';
import { CanvasColumnsAssignmentsComponent } from './canvas-columns/canvas-columns-assignments/canvas-columns-assignments.component';
import { CanvasColumnsSummaryComponent } from './canvas-columns/canvas-columns-summary/canvas-columns-summary.component';
import { CanvasCourseComponent } from './canvas-course/canvas-course.component';
import { CanvasCoursesComponent } from './canvas-courses/canvas-courses.component';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';
import { CanvasService } from './services/canvas.service';

export const coursesResolver: ResolveFn<Course[]> = () =>
  inject(CanvasService).getCourses();

export const courseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot
) => inject(CanvasService).getCourse(Number(route.paramMap.get('course_id')));

export const studentsResolver: ResolveFn<OntaskStudent[]> = (
  route: ActivatedRouteSnapshot
) => {
  const canvasService = inject(CanvasService);
  const courseId = Number(route.paramMap.get('course_id'));

  const reduceDuplicates = (students: Student[], student: Student) => {
    if (!students.some(({ id }) => id === student.id)) {
      students.push(student);
    }
    return students;
  };

  const mapToOntask = (student: Student): OntaskStudent => {
    const id = student.id;
    const sid = student['sis_user_id'];
    const splitName = student['sortable_name'].split(', ');
    const lastName = splitName[0];
    const firstName = splitName[1];
    const emailCandidate = student['email'] || student['login_id'];
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCandidate)
      ? emailCandidate
      : null;
    return { id, sid, firstName, lastName, email };
  };

  return canvasService.getStudents(courseId).pipe(
    map((students) => students.reduce(reduceDuplicates, [] as Student[])),
    map((students) => students.map(mapToOntask))
  );
};

export default [
  {
    path: '',
    component: CanvasPageComponent,
    title: 'OnTaskify | Canvas-to-OnTask data integration',
    providers: [
      {
        provide: 'ONTASK_MERGERS',
        multi: true,
        useValue: [
          {
            type: 'summary',
            component: CanvasColumnsSummaryComponent,
            title: 'Summary (Page views/participations)',
          },
          {
            type: 'assignments',
            component: CanvasColumnsAssignmentsComponent,
            title: 'Assignments',
          },
        ],
      },
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CanvasCoursesComponent,
      },
      {
        path: 'test',
        pathMatch: 'full',
        component: CanvasTestComponent,
        resolve: { courses: coursesResolver },
      },
      {
        path: ':course_id',
        component: CanvasCourseComponent,
        resolve: {
          course: courseResolver,
          students: studentsResolver,
        },
      },
    ],
  },
] as Routes;

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { map } from 'rxjs';
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
    const student_id = student['sis_user_id'];
    const splitName = student['sortable_name'].split(', ');
    const last_name = splitName[0];
    const first_name = splitName[1];
    const emailCandidate = student['email'] || student['login_id'];
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCandidate)
      ? emailCandidate
      : null;
    return { id, student_id, first_name, last_name, email };
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CanvasCoursesComponent,
        resolve: { courses: coursesResolver },
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

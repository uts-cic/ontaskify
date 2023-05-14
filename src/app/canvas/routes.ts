import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { uniqBy } from 'lodash';
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

export const studentsResolver: ResolveFn<Student[]> = async (
  route: ActivatedRouteSnapshot
) => {
  const courseId = Number(route.paramMap.get('course_id'));
  const students = await inject(CanvasService).getStudents(courseId);
  return uniqBy(students, 'id');
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

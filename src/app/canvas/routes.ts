import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { CanvasConnectComponent } from './canvas-connect/canvas-connect.component';
import { CanvasCourseComponent } from './canvas-course/canvas-course.component';
import { CanvasCoursesComponent } from './canvas-courses/canvas-courses.component';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';
import { CanvasService } from './services/canvas.service';
import { TokenService } from './services/token.service';

export const profileResolver: ResolveFn<CanvasUserProfile> = () =>
  inject(CanvasService).getProfile();

export const coursesResolver: ResolveFn<CanvasCourse[]> = () =>
  inject(CanvasService).getCourses();

export const courseResolver: ResolveFn<CanvasCourse> = (
  route: ActivatedRouteSnapshot
) => inject(CanvasService).getCourse(Number(route.paramMap.get('course_id')));

export default [
  {
    path: '',
    canMatch: [() => !inject(TokenService).token()],
    children: [{ path: '**', component: CanvasConnectComponent }],
    title: 'Connect | Canvas-to-OnTask | OnTaskify',
  },
  {
    path: '',
    component: CanvasPageComponent,
    resolve: { profile: profileResolver },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CanvasCoursesComponent,
        resolve: { courses: coursesResolver },
        title: 'Select a course | Canvas-to-OnTask | OnTaskify',
      },
      {
        path: 'api',
        pathMatch: 'full',
        component: CanvasTestComponent,
        resolve: { courses: coursesResolver },
        title: 'API testing | Canvas-to-OnTask | OnTaskify',
      },
      {
        path: ':course_id',
        component: CanvasCourseComponent,
        resolve: { course: courseResolver },
        title: 'Build CSV | Canvas-to-OnTask | OnTaskify',
      },
    ],
  },
] as Routes;

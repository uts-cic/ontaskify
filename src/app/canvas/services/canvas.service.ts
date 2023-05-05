import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private tokenService = inject(TokenService);
  private httpClient = inject(HttpClient);

  query(endpoint: string, params?: HttpParams) {
    const basePath = '/api/v1';
    const token = this.tokenService.getToken();
    const headers = { authorization: `Bearer ${token}` };
    return this.httpClient.get(`${basePath}/${endpoint}`, { headers, params });
  }

  getProfile(): Observable<UserProfile> {
    console.log('getProfile');
    return this.query('users/self/profile') as Observable<UserProfile>;
  }

  getCourses(): Observable<Course[]> {
    const endpoint = 'courses';
    const params = new HttpParams()
      .set('enrollment_type', 'teacher')
      .set('per_page', '10000');
    return this.query(endpoint, params) as Observable<Course[]>;
  }

  getCourse(id: number): Observable<Course> {
    const endpoint = 'courses/' + id;
    return this.query(endpoint) as Observable<Course>;
  }

  getStudents(id: number) {
    const endpoint = 'courses/' + id + '/students';
    return this.query(endpoint) as Observable<Student[]>;
  }

  getStudentSummaries(id: number) {
    const endpoint = 'courses/' + id + '/analytics/student_summaries';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint, params) as Observable<StudentSummary[]>;
  }

  getAssignments(id: number) {
    const endpoint = 'courses/' + id + '/assignments';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint) as Observable<CanvasAssignment[]>;
  }

  getObject(courseId: number, studentId: number) {
    const endpoints = [
      `courses/${courseId}/analytics/activity`,
      `courses/${courseId}/assignments`,
      `courses/${courseId}/discussion_topics`,
      `courses/${courseId}/enrollments`,
      `courses/${courseId}/files`,
      `courses/${courseId}/folders`,
      `courses/${courseId}/groups`,
      `courses/${courseId}/modules`,
      `courses/${courseId}/outcome_results`,
      `courses/${courseId}/quizzes`,
      `courses/${courseId}/users`,
    ];

    const endpoint = `courses/${courseId}/analytics/users/${studentId}/assignments`;
    return this.query(endpoint) as Observable<Object>;
  }
}

// {
//   "id": 94110,
//   "name": "Simon Kwok",
//   "created_at": "2021-01-14T20:49:12+11:00",
//   "sortable_name": "Kwok, Simon",
//   "short_name": "Simon Kwok"
// },

// {
//   "id": 18114,
//   "name": "Irina Kabakova",
//   "created_at": "2019-07-18T13:22:40+10:00",
//   "sortable_name": "Kabakova, Irina",
//   "short_name": "Irina Kabakova",
//   "sis_user_id": "134390",
//   "integration_id": null,
//   "login_id": "Irina.Kabakova@uts.edu.au"
// },

// /activity
// {
//   page_views: {
//     '2021-06-30T16:00:00+10:00': 1,
//     '2021-07-04T20:00:00+10:00': 1,
//     '2021-07-05T10:00:00+10:00': 4,
//     '2021-07-05T11:00:00+10:00': 2,
//     '2021-07-11T15:00:00+10:00': 1,
//     '2021-07-12T15:00:00+10:00': 1,
//     '2021-07-12T18:00:00+10:00': 1,
//     '2021-07-12T21:00:00+10:00': 2,
//     '2021-07-14T09:00:00+10:00': 1,
//     '2021-07-14T12:00:00+10:00': 2,
//     '2022-07-25T12:00:00+10:00': 2,
//     '2022-07-27T08:00:00+10:00': 9,
//     '2022-07-28T10:00:00+10:00': 2,
//     '2022-07-28T11:00:00+10:00': 2,
//   },
//   participations: [],
// }

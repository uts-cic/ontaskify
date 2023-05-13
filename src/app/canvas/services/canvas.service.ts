import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private httpClient = inject(HttpClient);
  private token = inject(TokenService).token;

  query(endpoint: string, params?: HttpParams) {
    const basePath = '/api/v1';
    const headers = { authorization: `Bearer ${this.token()}` };
    return this.httpClient.get(`${basePath}/${endpoint}`, { headers, params });
  }

  getProfile(): Observable<UserProfile> {
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

  getBulkUserProgress(id: number) {
    const endpoint = 'courses/' + id + '/bulk_user_progress';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint, params) as Observable<UserProgress[]>;
  }

  getEnrollments(id: number) {
    const endpoint = 'courses/' + id + '/enrollments';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint, params) as Observable<CanvasEnrollment[]>;
  }

  getAssignments(id: number) {
    const endpoint = 'courses/' + id + '/assignments';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint, params) as Observable<CanvasAssignment[]>;
  }

  getAssignmentSubmissions(id: number, assignmentId: number) {
    const endpoint =
      'courses/' + id + '/assignments/' + assignmentId + '/submissions';
    const params = new HttpParams().set('per_page', '10000');
    return this.query(endpoint, params) as Observable<CanvasSubmission[]>;
  }
}

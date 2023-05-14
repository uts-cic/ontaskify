import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private httpClient = inject(HttpClient);
  private token = inject(TokenService).token;

  async query<T>(endpoint: string, params: HttpParams = new HttpParams()) {
    const basePath = '/api/v1';
    const headers = { authorization: `Bearer ${this.token()}` };
    const options = { headers, params: params.set('per_page', '10000') };
    const request$ = this.httpClient.get(`${basePath}/${endpoint}`, options);
    return firstValueFrom(request$) as Promise<T>;
  }

  async getProfile(): Promise<UserProfile> {
    return this.query<UserProfile>('users/self/profile');
  }

  async getCourses(): Promise<Course[]> {
    const params = new HttpParams().set('enrollment_type', 'teacher');
    return this.query<Course[]>('courses', params);
  }

  async getCourse(id: number): Promise<Course> {
    return this.query<Course>('courses/' + id);
  }

  async getStudents(id: number): Promise<Student[]> {
    return this.query<Student[]>('courses/' + id + '/students');
  }
}

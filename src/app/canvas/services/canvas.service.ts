import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { at } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

const extractNextPage = (linkHeader: string | null): string | null => {
  const url = linkHeader?.match(/(?<=<)([^>]+)(?=>;\s*rel="next")/)?.[0];
  const page = url?.match(/[?&]page=([^&#]+)/)?.[1];
  return page || null;
};

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private httpClient = inject(HttpClient);
  private token = inject(TokenService).token;

  async request<T>(endpoint: string, params: HttpParams = new HttpParams()) {
    const basePath = '/api/v1';
    const headers = { authorization: `Bearer ${this.token()}` };
    const options = { headers, params, observe: 'response' as 'response' };
    const request$ = this.httpClient.get<T>(`${basePath}/${endpoint}`, options);
    return firstValueFrom(request$) as Promise<HttpResponse<T>>;
  }

  async query<T>(endpoint: string, params: HttpParams = new HttpParams()) {
    return (await this.request<T>(endpoint, params)).body as T;
  }

  async queryMany<T>(
    endpoint: string,
    params: HttpParams = new HttpParams(),
    path = '',
    perPage = 100
  ) {
    params = params.set('per_page', perPage);

    const items: T[] = [];
    let page = 0;
    while (true) {
      const response = await this.request(endpoint, params);
      const responseItems = path
        ? at(response.body as { [prop: string]: T[] }, [path])[0]
        : (response.body as T[]);
      items.push(...responseItems);

      const linkHeader = response.headers.get('link');
      const nextPage = linkHeader
        ? extractNextPage(linkHeader)
        : responseItems.length === perPage && ++page;

      if (nextPage) {
        params = params.set('page', nextPage);
      } else {
        break;
      }
    }
    return items;
  }

  async getProfile(): Promise<UserProfile> {
    return this.query<UserProfile>('users/self/profile');
  }

  async getCourses(): Promise<Course[]> {
    const params = new HttpParams().set('enrollment_type', 'teacher');
    return this.queryMany<Course>('courses', params);
  }

  async getCourse(id: number): Promise<Course> {
    return this.query<Course>('courses/' + id);
  }

  async getStudents(id: number): Promise<UserProfile[]> {
    const params = new HttpParams().set('enrollment_type', 'student');
    return this.queryMany<UserProfile>('courses/' + id + '/users', params);
  }
}

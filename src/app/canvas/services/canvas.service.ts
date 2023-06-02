import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProgressService } from '@app/shared';
import { at, now } from 'lodash';
import { catchError, firstValueFrom, throwError } from 'rxjs';
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
  private progress = inject(ProgressService).progress;

  async request<T>(endpoint: string, params: HttpParams = new HttpParams()) {
    const basePath = '/api/v1';
    const headers = { authorization: `Bearer ${this.token()}` };
    const options = { headers, params, observe: 'response' as 'response' };
    const request$ = this.httpClient
      .get<T>(`${basePath}/${endpoint}`, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message =
            error.error?.errors?.[0]?.message ||
            error.error?.error?.message ||
            error.error?.message ||
            error.message ||
            'Unknown error';
          console.log(message);
          this.progress.mutate((progress) => {
            if (progress) progress.error = message;
          });
          return throwError(() => new Error(message));
        })
      );
    return firstValueFrom(request$) as Promise<HttpResponse<T>>;
  }

  async query<T>(endpoint: string, params: HttpParams = new HttpParams()) {
    this.progress.set({ endpoint });
    const response = await this.request<T>(endpoint, params);
    this.progress.set(null);
    return response.body as T;
  }

  async queryMany<T>(
    endpoint: string,
    params: HttpParams = new HttpParams(),
    path = '',
    perPage = 100
  ) {
    params = params.set('per_page', perPage);
    this.progress.set({ endpoint, items: 0, time: 0 });

    const items: T[] = [];
    let page = 0;
    while (true) {
      const start = now();
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
        this.progress.mutate((progress) => {
          progress!.items = items.length;
          progress!.time = now() - start;
        });
      } else {
        this.progress.set(null);
        break;
      }
    }
    return items;
  }

  async getProfile(): Promise<CanvasUserProfile> {
    return this.query<CanvasUserProfile>('users/self/profile');
  }

  async getCourses(): Promise<CanvasCourse[]> {
    const params = new HttpParams().set('enrollment_type', 'teacher');
    return this.queryMany<CanvasCourse>('courses', params);
  }

  async getCourse(id: number): Promise<CanvasCourse> {
    return this.query<CanvasCourse>('courses/' + id);
  }
}

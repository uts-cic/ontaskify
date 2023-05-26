import { HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasCourseService {
  private canvasService = inject(CanvasService);
  course = signal<Course | null>(null);
  path = computed(() => `courses/${this.course()?.id || 0}`);

  async getStudentSummaries(): Promise<StudentSummary[]> {
    return this.canvasService.queryMany<StudentSummary>(
      `${this.path()}/analytics/student_summaries`
    );
  }

  async getBulkUserProgress(): Promise<UserProgress[]> {
    return this.canvasService.queryMany<UserProgress>(
      `${this.path()}/bulk_user_progress`
    );
  }

  async getEnrollments(): Promise<CanvasEnrollment[]> {
    const params = new HttpParams().set('type', 'StudentEnrollment');
    return this.canvasService.queryMany<CanvasEnrollment>(
      `${this.path()}/enrollments`,
      params
    );
  }

  async getAssignments(): Promise<CanvasAssignment[]> {
    return this.canvasService.queryMany<CanvasAssignment>(
      `${this.path()}/assignments`
    );
  }

  async getAssignmentSubmissions(
    assignmentId: number
  ): Promise<CanvasSubmission[]> {
    return this.canvasService.queryMany<CanvasSubmission>(
      `${this.path()}/assignments/${assignmentId}/submissions`
    );
  }

  async getQuizzes(): Promise<CanvasQuiz[]> {
    return this.canvasService.queryMany<CanvasQuiz>(`${this.path()}/quizzes`);
  }

  async getQuizSubmissions(quizId: number): Promise<CanvasQuiz[]> {
    return this.canvasService.queryMany<CanvasQuiz>(
      `${this.path()}/quizzes/${quizId}/submissions`,
      new HttpParams(),
      'quiz_submissions'
    );
    // const params = .set('per_page', '50');
    // const result = await this.canvasService.query<{
    //   quiz_submissions: CanvasQuiz[];
    // }>(`${this.path()}/quizzes/${quizId}/submissions`, params);
    // return result.quiz_submissions;
  }

  reset() {
    this.course.set(null);
  }
}

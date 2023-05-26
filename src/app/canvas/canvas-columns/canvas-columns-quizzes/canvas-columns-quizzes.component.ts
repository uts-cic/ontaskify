import { CommonModule } from '@angular/common';
import {
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { OntaskMergeMapPipe } from 'src/app/shared/ontask-merge/ontask-merge-map.pipe';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { CanvasCourseService } from '../../services/canvas-course.service';

@Component({
  selector: 'app-canvas-columns-quizzes',
  standalone: true,
  imports: [CommonModule, MaterialModule, SelectColumnsComponent],
  templateUrl: './canvas-columns-quizzes.component.html',
  styleUrls: ['./canvas-columns-quizzes.component.scss'],
})
export class CanvasColumnsQuizzesComponent {
  loading: WritableSignal<boolean> = signal(true);
  id: WritableSignal<string> = signal('id');
  cols: WritableSignal<string[]> = signal([]);
  rows: WritableSignal<OntaskMergeMap | null> = signal(null);

  private canvasCourseService = inject(CanvasCourseService);
  private ontaskMergeMapPipe = inject(OntaskMergeMapPipe);

  quizzes: WritableSignal<CanvasQuiz[] | null> = signal(null);
  quiz: WritableSignal<CanvasQuiz | null> = signal(null);

  constructor() {
    effect(
      async () => {
        const quiz = this.quiz();
        if (quiz) {
          this.loading.set(true);
          const submissions = await this.canvasCourseService.getQuizSubmissions(
            quiz.id
          );
          this.rows.set(
            this.ontaskMergeMapPipe.transform(submissions, 'user_id')
          );
          this.loading.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }

  async ngOnInit() {
    const quizzes = await this.canvasCourseService.getQuizzes();
    this.quizzes.set(quizzes);
    this.loading.set(false);
  }
}

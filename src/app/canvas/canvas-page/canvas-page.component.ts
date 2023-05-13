import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MaterialModule } from '../../shared/material.module';
import { CanvasConnectComponent } from '../canvas-connect/canvas-connect.component';
import { CanvasCoursesComponent } from '../canvas-courses/canvas-courses.component';
import { CanvasService } from '../services/canvas.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-canvas-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CanvasConnectComponent,
    CanvasCoursesComponent,
  ],
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.scss'],
})
export class CanvasPageComponent {
  private canvasService = inject(CanvasService);
  token = inject(TokenService).token;
  maskedToken = computed(() => this.token()?.substring(0, 6).padEnd(9, '*'));
  data$ = toObservable(this.token).pipe(
    switchMap((token) => (token ? this.canvasService.getProfile() : of(null)))
  );

  endSession() {
    this.token.set(null);
  }
}

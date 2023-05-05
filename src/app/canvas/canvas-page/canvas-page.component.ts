import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
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
  token$ = inject(TokenService).getTokenAsObservable();
  data$ = this.token$.pipe(
    tap((token) => console.log('Before: ' + token)),
    filter((token) => !!token),
    tap((token) => console.log('After: ' + token)),
    switchMap((token) => (token && this.canvasService.getProfile()) || of(null))
  );
}

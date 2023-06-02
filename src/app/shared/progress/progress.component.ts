import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progress = inject(ProgressService).progress;
  animation = computed(() => [
    `animation-duration: ${this.progress()?.time || 0}ms`,
  ]);
}

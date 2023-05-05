import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, tap } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import { DoColumnMerge } from 'src/app/shared/ontask-merge/ontask-merge.service';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-columns-assignments',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './canvas-columns-assignments.component.html',
  styleUrls: ['./canvas-columns-assignments.component.scss'],
})
export class CanvasColumnsAssignmentsComponent implements DoColumnMerge {
  private canvasService = inject(CanvasService);
  private dialogRef = inject(MatDialogRef<CanvasColumnsAssignmentsComponent>);
  private data = inject(MAT_DIALOG_DATA) as { course: Course };
  loading = true;
  assignments$ = this.canvasService
    .getAssignments(this.data.course.id!)
    .pipe(tap(() => (this.loading = false)));

  doColumnMerge() {
    return of(['id']);
  }
}

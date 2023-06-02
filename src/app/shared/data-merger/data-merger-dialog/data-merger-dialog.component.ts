import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Signal,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MergeData } from '../../ontask.service';
import { DataFetcher, DataMerger } from '../data-merger.service';

@Component({
  selector: 'app-data-merger-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './data-merger-dialog.component.html',
  styleUrls: ['./data-merger-dialog.component.scss'],
})
export class DataMergerDialogComponent implements AfterViewInit {
  private cdRef = inject(ChangeDetectorRef);
  private dialogRef = inject(MatDialogRef);

  mergeData?: Signal<MergeData | null>;
  error?: Signal<string | null>;

  data = inject(MAT_DIALOG_DATA) as DataMerger;

  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  instance?: DataFetcher;

  ngAfterViewInit() {
    const { component } = this.data;
    this.instance = this.componentContainer.createComponent(component).instance;
    this.mergeData = computed(() => {
      if (!this.instance) return null;
      if (this.instance.loading()) return null;
      const id = this.instance.id();
      const cols = this.instance.cols();
      const rows = this.instance.rows();
      if (!(id && cols?.length > 0 && rows?.size)) return null;
      return { id, cols, rows };
    });
    this.error = this.instance.error || undefined;
    this.cdRef.detectChanges();
  }

  apply() {
    if (this.instance && this.mergeData?.()) {
      const id = this.instance.id();
      const cols = this.instance.cols();
      const rows = this.instance.rows();
      this.dialogRef.close({ id, cols, rows });
    }
  }
}

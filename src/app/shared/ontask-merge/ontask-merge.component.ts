import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  Signal,
  Type,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { MergeData } from '../ontask.service';

export interface OntaskMerge {
  loading: WritableSignal<boolean>;
  id: WritableSignal<string>;
  cols: WritableSignal<string[]>;
  rows: WritableSignal<OntaskMergeMap | null>;
}

@Component({
  selector: 'app-ontask-merge',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './ontask-merge.component.html',
  styleUrls: ['./ontask-merge.component.scss'],
})
export class OntaskMergeComponent implements AfterViewInit {
  private cdRef = inject(ChangeDetectorRef);
  private dialogRef = inject(MatDialogRef);

  mergeData?: Signal<MergeData | null>;

  data = inject(MAT_DIALOG_DATA) as {
    title: string;
    component: Type<OntaskMerge>;
  };

  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  instance?: OntaskMerge;

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

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { combineLatest, map, take } from 'rxjs';
import { MaterialModule } from '../material.module';
import { DoColumnMerge, OntaskMergeService } from '../ontask-merge.service';

@Component({
  selector: 'app-ontask-merge',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './ontask-merge.component.html',
  styleUrls: ['./ontask-merge.component.scss'],
})
export class OntaskMergeComponent implements AfterViewInit {
  private cdRef = inject(ChangeDetectorRef);
  private ontaskMergeService = inject(OntaskMergeService);
  private dialogRef = inject(MatDialogRef);
  private instance?: DoColumnMerge;

  data = inject(MAT_DIALOG_DATA) as {
    title: string;
    component: Type<DoColumnMerge>;
  };

  loading$ = this.ontaskMergeService.getLoadingAsObservable();
  ready$ = this.ontaskMergeService.getReadyAsObservable();
  actionDisabled$ = combineLatest([this.loading$, this.ready$]).pipe(
    map(([loading, ready]) => loading || !ready)
  );

  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  ngAfterViewInit() {
    const { component } = this.data;
    this.instance = this.componentContainer.createComponent(component).instance;
    this.cdRef.detectChanges();
  }

  apply() {
    this.ontaskMergeService.setLoading(true);
    this.instance!.doColumnMerge()
      .pipe(take(1))
      .subscribe((columns) => this.dialogRef.close(columns));
  }
}

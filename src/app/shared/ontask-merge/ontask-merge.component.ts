import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, map } from 'rxjs';
import { MaterialModule } from '../material.module';
import { OntaskMergeService } from './ontask-merge.service';

@Component({
  selector: 'app-ontask-merge',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './ontask-merge.component.html',
  styleUrls: ['./ontask-merge.component.scss'],
})
export class OntaskMergeComponent {
  private ontaskMergeService = inject(OntaskMergeService);

  data = inject(MAT_DIALOG_DATA) as { title: string };

  loading$ = this.ontaskMergeService.getLoadingAsObservable();
  ready$ = this.ontaskMergeService.getReadyAsObservable();
  actionDisabled$ = combineLatest([this.loading$, this.ready$]).pipe(
    map(([loading, ready]) => loading || !ready)
  );

  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  apply() {
    this.ontaskMergeService.merge();
  }
}

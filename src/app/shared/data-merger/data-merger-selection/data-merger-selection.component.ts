import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { DataMerger, DataMergerService } from '../data-merger.service';

@Component({
  selector: 'app-data-merger-selection',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './data-merger-selection.component.html',
  styleUrls: ['./data-merger-selection.component.scss'],
})
export class DataMergerSelectionComponent {
  private bottomSheetRef = inject(
    MatBottomSheetRef<DataMergerSelectionComponent>
  );
  mergers = inject(MAT_BOTTOM_SHEET_DATA) as DataMerger[];

  private dataMergerService = inject(DataMergerService);
  selectMerger(merger: DataMerger) {
    this.bottomSheetRef.dismiss();
    this.dataMergerService.openMerger(merger);
  }
}

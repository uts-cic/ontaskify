import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { isNumber, isString } from 'lodash';
import { PreviewPipe } from './preview.pipe';

@Component({
  selector: 'app-select-columns',
  standalone: true,
  imports: [CommonModule, MatListModule, PreviewPipe],
  templateUrl: './select-columns.component.html',
  styleUrls: ['./select-columns.component.scss'],
})
export class SelectColumnsComponent {
  private _rows!: OntaskMergeMap;
  private _values!: Map<string, Array<string | number>>;

  @Input({ required: true }) set rows(rows: OntaskMergeMap | null) {
    this._rows = rows || new Map();
    this._values = new Map();
    this._rows.forEach((row) => {
      Object.keys(row).forEach((prop) => {
        const value = row[prop];
        if ((value && isString(value)) || isNumber(value)) {
          const values = this._values.get(prop) || [];
          this._values.set(prop, [...values, value]);
        }
      });
    });
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return Array.from(this._values.keys());
  }

  get values() {
    return this._values;
  }

  @Output() selectionChange = new EventEmitter<string[]>();

  updateSelection({ source }: MatSelectionListChange) {
    this.selectionChange.emit(
      source.selectedOptions.selected.map(({ value }) => value)
    );
  }
}

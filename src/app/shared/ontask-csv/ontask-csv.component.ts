import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OntaskService } from '../ontask.service';

@Component({
  selector: 'app-ontask-csv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './ontask-csv.component.html',
  styleUrls: ['./ontask-csv.component.scss'],
})
export class OntaskCsvComponent implements OnInit {
  private ontaskService = inject(OntaskService);
  columns = this.ontaskService.columns;
  rows = this.ontaskService.rows;

  @Input({ required: true }) name!: string;

  filename = '';

  dataSource = new MatTableDataSource<OntaskRow>();

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (!paginator) return;
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (!sort) return;
    this.dataSource.sort = sort;
  }

  constructor() {
    effect(() => (this.dataSource.data = this.rows() || []));
  }

  ngOnInit() {
    this.filename = this.name + '.csv';
  }

  download() {
    this.ontaskService.exportToCsv(this.filename);
  }
}

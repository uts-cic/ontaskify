import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../material.module';
import { OntaskService } from '../ontask.service';

@Component({
  selector: 'app-ontask-csv',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './ontask-csv.component.html',
  styleUrls: ['./ontask-csv.component.scss'],
})
export class OntaskCsvComponent implements OnInit, AfterViewInit {
  private ontaskService = inject(OntaskService);
  columns = this.ontaskService.columns;
  rows = this.ontaskService.rows;

  @Input({ required: true }) name!: string;

  filename = '';

  dataSource = new MatTableDataSource<OntaskRow>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => (this.dataSource.data = this.rows()));
  }

  ngOnInit() {
    this.filename = this.name + '.csv';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  download() {
    this.ontaskService.exportToCsv(this.filename);
  }
}

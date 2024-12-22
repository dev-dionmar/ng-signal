import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { DatePipe } from '@angular/common';
import { TableStore } from './table.store';
import { MatIconModule } from '@angular/material/icon';

const DATA: NotesArr_i = {
  data: [
    { id: 1, note: 'Sample note 1', createdAt: '2024-12-17T12:43:33.398059' },
    { id: 2, note: 'Sample note 2', createdAt: '2024-11-28T12:43:33.398059' },
    { id: 3, note: 'Sample note 3', createdAt: '2024-12-20T12:43:33.398059' },
    { id: 4, note: 'Sample note 4', createdAt: '2024-11-24T12:43:33.398059' },
    { id: 5, note: 'Sample note 5', createdAt: '2024-12-10T12:43:33.398059' },
    { id: 6, note: 'Sample note 6', createdAt: '2024-12-01T12:43:33.398059' },
    { id: 7, note: 'Sample note 7', createdAt: '2024-11-28T12:43:33.398059' },
    { id: 8, note: 'Sample note 8', createdAt: '2024-12-13T12:43:33.398059' },
    { id: 9, note: 'Sample note 9', createdAt: '2024-12-20T12:43:33.398059' },
    { id: 10, note: 'Sample note 10', createdAt: '2024-12-04T12:43:33.398059' },
  ],
  count: 10,
};

export interface TablePage_i {
  pageIndex: number;
  pageSize: number;
  total: number;
}
export interface NotesArr_i {
  data: { id: number; note: string; createdAt: Date | string }[];
  count: number;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [DatePipe],
})
export class TableComponent {
  constructor(private matDialog: MatDialog) {}
  columns = [
    {
      columnDef: 'note',
      header: 'note',
      cell: (element: NotesArr_i['data'][0]) => `${element.note}`,
    },
    {
      columnDef: 'createdAt',
      header: 'created At',
      cell: (element: NotesArr_i['data'][0]) =>
        `${this.datePipe.transform(element.createdAt)}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  datePipe = inject(DatePipe);
  readonly store = inject(TableStore);

  ngOnInit() {
    this.store.init(DATA);
  }

  onOpenDialog(title: string, row?: NotesArr_i['data'][0]) {
    this.matDialog.open(TableDialogComponent, {
      data: { title, row },
      width: '600px',
    });
  }
}

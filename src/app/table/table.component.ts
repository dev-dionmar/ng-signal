import { Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { DatePipe } from '@angular/common';

const DATA: NotesArr_i = {
  data: [
    { note: 'Sample note 1', createdAt: '2024-12-17T12:43:33.398059' },
    { note: 'Sample note 2', createdAt: '2024-11-28T12:43:33.398059' },
    { note: 'Sample note 3', createdAt: '2024-12-20T12:43:33.398059' },
    { note: 'Sample note 4', createdAt: '2024-11-24T12:43:33.398059' },
    { note: 'Sample note 5', createdAt: '2024-12-10T12:43:33.398059' },
    { note: 'Sample note 6', createdAt: '2024-12-01T12:43:33.398059' },
    { note: 'Sample note 7', createdAt: '2024-11-28T12:43:33.398059' },
    { note: 'Sample note 8', createdAt: '2024-12-13T12:43:33.398059' },
    { note: 'Sample note 9', createdAt: '2024-12-20T12:43:33.398059' },
    { note: 'Sample note 10', createdAt: '2024-12-04T12:43:33.398059' },
  ],
  count: 10,
};

export interface TablePage_i {
  pageIndex: number;
  pageSize: number;
  total: number;
}
export interface NotesArr_i {
  data: { note: string; createdAt: Date | string }[];
  count: number;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule],
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
  dataSource = new MatTableDataSource<NotesArr_i['data']['0']>([]);
  datePipe = inject(DatePipe);
  tablePage: TablePage_i = {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  };

  ngOnInit() {
    this.loadNotes(this.tablePage);
  }

  private loadNotes(param: TablePage_i) {
    this.dataSource.data = DATA.data;
    this.tablePage.total = DATA.count;
  }

  onOpenDialog(title: string, row?: NotesArr_i['data'][0]) {
    this.matDialog.open(TableDialogComponent, {
      data: { title, row },
      width: '600px',
    });
  }

  handlePageEvent(e: PageEvent) {
    this.tablePage.pageIndex = e.pageIndex + 1;
    this.tablePage.pageSize = e.pageSize;
    this.loadNotes(this.tablePage);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotesArr_i } from '../table.component';
import { TableStore } from '../table.store';

@Component({
  selector: 'app-table-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.scss',
})
export class TableDialogComponent {
  dialogData: { title: string; row: NotesArr_i['data'][0] } =
    inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  readonly store = inject(TableStore);

  form = this.fb.group({
    note: ['', Validators.required],
  });

  ngOnInit() {
    if (this.dialogData.title === 'update') {
      this.form.patchValue(this.dialogData.row);
    }
  }

  onSubmit() {
    if (this.dialogData.title === 'create') {
      this.store.modify('create', {
        id: Math.floor(Math.random() * 10) + 11,
        note: this.form.value.note as string,
        createdAt: new Date(),
      });
    } else {
      this.store.modify('update', {
        id: this.dialogData.row.id,
        note: this.form.value.note as string,
        createdAt: this.dialogData.row.createdAt,
      });
    }
  }
}

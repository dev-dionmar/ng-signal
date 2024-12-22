import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotesArr_i } from '../table.component';

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

  form = this.fb.group({
    note: ['', Validators.required],
  });

  ngOnInit() {
    if (this.dialogData.title === 'update') {
      this.form.patchValue(this.dialogData.row);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

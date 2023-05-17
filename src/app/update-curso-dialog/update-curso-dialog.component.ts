import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-curso-dialog',
  templateUrl: './update-curso-dialog.component.html',
  styleUrls: ['./update-curso-dialog.component.css']
})
export class UpdateCursoDialogComponent{
  updateCursoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.updateCursoForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateCursoForm.valid) {
      this.dialogRef.close(this.updateCursoForm.value);
    }
  }
}

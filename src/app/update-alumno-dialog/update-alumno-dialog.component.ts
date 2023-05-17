import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-alumno-dialog',
  templateUrl: './update-alumno-dialog.component.html',
  styleUrls: ['./update-alumno-dialog.component.css']
})
export class UpdateAlumnoDialogComponent {
  updateAlumnoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.updateAlumnoForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      lastName: [data.lastName, Validators.required],
      carne: [data.carne, Validators.required],
      email: [data.email, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateAlumnoForm.valid) {
      this.dialogRef.close(this.updateAlumnoForm.value);
    }
  }
}

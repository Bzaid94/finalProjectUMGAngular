import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-catedratico-dialog',
  templateUrl: './update-catedratico-dialog.component.html',
  styleUrls: ['./update-catedratico-dialog.component.css']
})
export class UpdateCatedraticoDialogComponent {
  updateCatedraticoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCatedraticoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.updateCatedraticoForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      lastName: [data.lastName, Validators.required],
      speciality: [data.speciality, Validators.required],
      email: [data.email, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateCatedraticoForm.valid) {
      this.dialogRef.close(this.updateCatedraticoForm.value);
    }
  }
}

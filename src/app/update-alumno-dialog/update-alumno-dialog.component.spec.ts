import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlumnoDialogComponent } from './update-alumno-dialog.component';

describe('UpdateAlumnoDialogComponent', () => {
  let component: UpdateAlumnoDialogComponent;
  let fixture: ComponentFixture<UpdateAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAlumnoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

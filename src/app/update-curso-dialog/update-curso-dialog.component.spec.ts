import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCursoDialogComponent } from './update-curso-dialog.component';

describe('UpdateCursoDialogComponent', () => {
  let component: UpdateCursoDialogComponent;
  let fixture: ComponentFixture<UpdateCursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCursoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

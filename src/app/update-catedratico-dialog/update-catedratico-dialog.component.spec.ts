import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCatedraticoDialogComponent } from './update-catedratico-dialog.component';

describe('UpdateCatedraticoDialogComponent', () => {
  let component: UpdateCatedraticoDialogComponent;
  let fixture: ComponentFixture<UpdateCatedraticoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCatedraticoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCatedraticoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

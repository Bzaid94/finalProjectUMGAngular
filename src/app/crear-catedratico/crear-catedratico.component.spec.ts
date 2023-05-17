import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCatedraticoComponent } from './crear-catedratico.component';

describe('CrearCatedraticoComponent', () => {
  let component: CrearCatedraticoComponent;
  let fixture: ComponentFixture<CrearCatedraticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCatedraticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCatedraticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCitasComponent } from './registrar-citas.component';

describe('RegistrarCitasComponent', () => {
  let component: RegistrarCitasComponent;
  let fixture: ComponentFixture<RegistrarCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

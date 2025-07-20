import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalForms } from './final-forms';

describe('FinalForms', () => {
  let component: FinalForms;
  let fixture: ComponentFixture<FinalForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

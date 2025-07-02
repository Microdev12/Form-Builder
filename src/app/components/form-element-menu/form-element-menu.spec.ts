import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementMenu } from './form-element-menu';

describe('FormElementMenu', () => {
  let component: FormElementMenu;
  let fixture: ComponentFixture<FormElementMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormElementMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

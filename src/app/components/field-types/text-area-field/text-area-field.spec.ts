import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaField } from './text-area-field';

describe('TextAreaField', () => {
  let component: TextAreaField;
  let fixture: ComponentFixture<TextAreaField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

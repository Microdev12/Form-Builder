import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableField } from './table-field';

describe('TableField', () => {
  let component: TableField;
  let fixture: ComponentFixture<TableField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

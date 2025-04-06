import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOnlyNumbersComponent } from './input-only-numbers.component';

describe('InputOnlyNumbersComponent', () => {
  let component: InputOnlyNumbersComponent;
  let fixture: ComponentFixture<InputOnlyNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOnlyNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOnlyNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

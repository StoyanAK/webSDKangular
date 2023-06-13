import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartWithoutFieldsComponent } from './cart-without-fields.component';

describe('CartWithoutFieldsComponent', () => {
  let component: CartWithoutFieldsComponent;
  let fixture: ComponentFixture<CartWithoutFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartWithoutFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartWithoutFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

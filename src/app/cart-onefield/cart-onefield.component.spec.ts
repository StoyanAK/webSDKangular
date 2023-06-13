import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOnefieldComponent } from './cart-onefield.component';

describe('CartOnefieldComponent', () => {
  let component: CartOnefieldComponent;
  let fixture: ComponentFixture<CartOnefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOnefieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOnefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

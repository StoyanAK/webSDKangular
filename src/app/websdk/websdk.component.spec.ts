import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsdkComponent } from './websdk.component';

describe('WebsdkComponent', () => {
  let component: WebsdkComponent;
  let fixture: ComponentFixture<WebsdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsdkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

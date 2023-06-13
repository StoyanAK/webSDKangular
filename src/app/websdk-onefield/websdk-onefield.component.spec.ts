import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsdkOnefieldComponent } from './websdk-onefield.component';

describe('WebsdkOnefieldComponent', () => {
  let component: WebsdkOnefieldComponent;
  let fixture: ComponentFixture<WebsdkOnefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsdkOnefieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsdkOnefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

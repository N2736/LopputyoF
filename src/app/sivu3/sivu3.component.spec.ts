import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sivu3Component } from './sivu3.component';

describe('Sivu3Component', () => {
  let component: Sivu3Component;
  let fixture: ComponentFixture<Sivu3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sivu3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sivu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

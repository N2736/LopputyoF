import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sivu1Component } from './sivu1.component';

describe('Sivu1Component', () => {
  let component: Sivu1Component;
  let fixture: ComponentFixture<Sivu1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sivu1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sivu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

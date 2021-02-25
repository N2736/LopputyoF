import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sivu2Component } from './sivu2.component';

describe('Sivu2Component', () => {
  let component: Sivu2Component;
  let fixture: ComponentFixture<Sivu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sivu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sivu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

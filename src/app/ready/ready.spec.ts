import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ready } from './ready';

describe('Ready', () => {
  let component: Ready;
  let fixture: ComponentFixture<Ready>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ready]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ready);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

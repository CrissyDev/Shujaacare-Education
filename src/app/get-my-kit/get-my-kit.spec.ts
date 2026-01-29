import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyKit } from './get-my-kit';

describe('GetMyKit', () => {
  let component: GetMyKit;
  let fixture: ComponentFixture<GetMyKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMyKit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMyKit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

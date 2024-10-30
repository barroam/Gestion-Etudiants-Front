import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UesComponent } from './ues.component';

describe('UesComponent', () => {
  let component: UesComponent;
  let fixture: ComponentFixture<UesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateUesComponent } from './add-update-ues.component';

describe('AddUpdateUesComponent', () => {
  let component: AddUpdateUesComponent;
  let fixture: ComponentFixture<AddUpdateUesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateUesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateUesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

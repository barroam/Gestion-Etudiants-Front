import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEvaluationComponent } from './add-update-evaluation.component';

describe('AddUpdateEvaluationComponent', () => {
  let component: AddUpdateEvaluationComponent;
  let fixture: ComponentFixture<AddUpdateEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

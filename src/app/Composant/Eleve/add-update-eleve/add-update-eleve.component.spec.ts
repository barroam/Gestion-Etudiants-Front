import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEleveComponent } from './add-update-eleve.component';

describe('AddUpdateEleveComponent', () => {
  let component: AddUpdateEleveComponent;
  let fixture: ComponentFixture<AddUpdateEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

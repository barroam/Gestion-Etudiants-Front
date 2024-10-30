import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUesComponent } from './list-ues.component';

describe('ListUesComponent', () => {
  let component: ListUesComponent;
  let fixture: ComponentFixture<ListUesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

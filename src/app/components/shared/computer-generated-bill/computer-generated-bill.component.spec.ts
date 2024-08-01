import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerGeneratedBillComponent } from './computer-generated-bill.component';

describe('ComputerGeneratedBillComponent', () => {
  let component: ComputerGeneratedBillComponent;
  let fixture: ComponentFixture<ComputerGeneratedBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerGeneratedBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerGeneratedBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

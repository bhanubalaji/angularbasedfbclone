import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfdetailsComponent } from './selfdetails.component';

describe('SelfdetailsComponent', () => {
  let component: SelfdetailsComponent;
  let fixture: ComponentFixture<SelfdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

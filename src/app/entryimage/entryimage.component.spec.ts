import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryimageComponent } from './entryimage.component';

describe('EntryimageComponent', () => {
  let component: EntryimageComponent;
  let fixture: ComponentFixture<EntryimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryimageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

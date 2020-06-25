import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlogComponent } from './getlog.component';

describe('GetlogComponent', () => {
  let component: GetlogComponent;
  let fixture: ComponentFixture<GetlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

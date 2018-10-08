import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestowyComponent } from './testowy.component';

describe('TestowyComponent', () => {
  let component: TestowyComponent;
  let fixture: ComponentFixture<TestowyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestowyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

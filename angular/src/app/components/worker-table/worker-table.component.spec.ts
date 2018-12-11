import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerTableComponent } from './worker-table.component';

describe('WorkerTableComponent', () => {
  let component: WorkerTableComponent;
  let fixture: ComponentFixture<WorkerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

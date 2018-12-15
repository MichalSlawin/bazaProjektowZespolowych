import { TestBed, inject } from '@angular/core/testing';

import { ProjectStudentsService } from './project-students.service';

describe('ProjectStudentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectStudentsService]
    });
  });

  it('should be created', inject([ProjectStudentsService], (service: ProjectStudentsService) => {
    expect(service).toBeTruthy();
  }));
});

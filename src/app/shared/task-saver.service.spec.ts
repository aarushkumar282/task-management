import { TestBed } from '@angular/core/testing';

import { TaskSaverService } from './task-saver.service';

describe('TaskSaverService', () => {
  let service: TaskSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

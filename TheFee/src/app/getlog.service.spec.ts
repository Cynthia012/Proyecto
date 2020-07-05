import { TestBed } from '@angular/core/testing';

import { GetlogService } from './getlog.service';

describe('GetlogService', () => {
  let service: GetlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

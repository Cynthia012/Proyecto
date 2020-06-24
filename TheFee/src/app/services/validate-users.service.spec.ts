import { TestBed } from '@angular/core/testing';

import { ValidateUsersService } from './validate-users.service';

describe('ValidateUsersService', () => {
  let service: ValidateUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

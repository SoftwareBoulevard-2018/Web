import { TestBed, inject } from '@angular/core/testing';

import { UserCompanyService } from './user-company.service';

describe('UserCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCompanyService]
    });
  });

  it('should be created', inject([UserCompanyService], (service: UserCompanyService) => {
    expect(service).toBeTruthy();
  }));
});

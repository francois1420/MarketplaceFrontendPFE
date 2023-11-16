import { TestBed } from '@angular/core/testing';

import { BaseItemService } from './base-item.service';

describe('BaseItemService', () => {
  let service: BaseItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
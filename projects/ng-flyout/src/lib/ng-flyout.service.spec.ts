import { TestBed } from '@angular/core/testing';

import { NgFlyoutService } from './ng-flyout.service';

describe('NgFlyoutService', () => {
  let service: NgFlyoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFlyoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

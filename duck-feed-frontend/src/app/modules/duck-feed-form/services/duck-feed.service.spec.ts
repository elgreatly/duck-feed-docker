import { TestBed } from '@angular/core/testing';

import { DuckFeedService } from './duck-feed.service';

describe('DuckFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuckFeedService = TestBed.get(DuckFeedService);
    expect(service).toBeTruthy();
  });
});

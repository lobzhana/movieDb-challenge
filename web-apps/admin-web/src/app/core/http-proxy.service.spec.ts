import { TestBed } from '@angular/core/testing';

import { HttpProxyService } from './http-proxy.service';

describe('HttpProxyService', () => {
  let service: HttpProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

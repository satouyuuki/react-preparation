import { TestBed, async } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: HttpClient,
        },
        {
          provide: HttpHandler,
          useClass: HttpHandler,
        },
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface Data {
  name: string;
}
const testUrl = '/data';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HttpClientService);
    // 各テストにhttpサービスとテストコントローラーを挿入する
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('can test HttpCLient.get', () => {
    const testData: Data = { name: 'Test Data' };

    httpClient.get<Data>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testData)
    );
    
    const req = httpTestingController.expectOne('/data');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    // 最後に未処理のリクエストがないことを確認
    httpTestingController.verify();
  });

  it('can test HttpCLient.get with matching header', () => {
    const testData: Data = { name: 'Test Data' };

    httpClient.get<Data>(testUrl, {
      headers: new HttpHeaders({'Authorization': 'my-auth-token'})
    })
      .subscribe(data =>
        expect(data).toEqual(testData)
    );    
    const req = httpTestingController.expectOne(
      req => req.headers.has('Authorization')
    );
    req.flush(testData);
  });

  it('can test multiple requests', () => {
    const testData: Data[] = [
      { name: 'bob' },
      // { name: 'carol' },
      // { name: 'ted' },
      // { name: 'alice' },
    ];

    httpClient.get<Data[]>(testUrl)
      .subscribe(data =>
        expect(data.length).toEqual(0, 'should have no data')
    );
    httpClient.get<Data[]>(testUrl)
      .subscribe(data =>
        expect(data).toEqual([testData[0]], 'should be one element array')
    );
    httpClient.get<Data[]>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testData, 'should be expected data')
    );
    const req = httpTestingController.match(testUrl);
    expect(req.length).toEqual(3);

    req[0].flush([]);
    req[1].flush([testData[0]]);
    req[2].flush(testData);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('sould have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
    const req = httpTestingController.expectOne(testUrl);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';

    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('sould have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
    const req = httpTestingController.expectOne(testUrl);
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });
    req.error(mockError);
  })
});

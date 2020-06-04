import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../contact.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      providers: [
        {
          provide: ContactService,
          useClass: ContactService,
        },
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
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

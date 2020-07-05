import { TestBed } from '@angular/core/testing';

import { SendMensajeService } from './send-mensaje.service';

describe('SendMensajeService', () => {
  let service: SendMensajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMensajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

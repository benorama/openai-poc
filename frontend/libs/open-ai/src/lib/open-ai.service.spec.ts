import {TestBed} from '@angular/core/testing';

import {OpenAiApiService} from './open-ai-api.service';

describe('OpenaiService', () => {
    let service: OpenAiApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OpenAiApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class OpenAiApiService {

    constructor(private httpClient: HttpClient) {
    }

    complete(prompt: string, temperature: number) {
        return this.httpClient.post(
            'http://localhost:8080/openai/completions',
            {
                prompt,
                temperature,
            }
        );
    }

    moderate(input: string) {
        return this.httpClient.post(
            'http://localhost:8080/openai/moderations',
            {
                input
            }
        );
    }
}

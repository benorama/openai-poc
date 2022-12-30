import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class OpenAiApiService {

    constructor(private httpClient: HttpClient) {
    }

    complete(prompt: string, maxTokens: number, temperature: number) {
        return this.httpClient.post(
            'http://localhost:8080/openai/completions',
            {
                prompt,
                maxTokens,
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

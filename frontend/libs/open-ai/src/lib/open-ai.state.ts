import {ModerationResult} from "./open-ai-moderation-result.model";

export interface OpenAiState {
    completion: {
        maxTokens: number,
        prompt: string,
        result: string,
        temperature: number
    },
    moderation: {
        input: string,
        result: ModerationResult
    }
}

export const initialOpenAiState: OpenAiState = {
    completion: {
        maxTokens: 256,
        prompt: '',
        result: '',
        temperature: 0
    },
    moderation: {
        input: '',
        result: new ModerationResult()
    }
}
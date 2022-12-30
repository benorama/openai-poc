import {ModerationResult} from "./open-ai-moderation-result.model";

export interface OpenAiState {
    completion: {
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
        prompt: '',
        result: '',
        temperature: 0
    },
    moderation: {
        input: '',
        result: new ModerationResult()
    }
}
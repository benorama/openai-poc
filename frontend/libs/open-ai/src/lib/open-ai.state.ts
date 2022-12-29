export interface OpenAiState {
    completion: {
        prompt: string,
        result: string,
        temperature: number
    },
    moderation: {
        results: []
    }
}

export const initialOpenAiState: OpenAiState = {
    completion: {
        prompt: '',
        result: '',
        temperature: 0
    },
    moderation: {
        results: []
    }
}
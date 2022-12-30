import {createReducer, on} from '@ngrx/store';
import {OpenAiActions} from './open-ai.actions';
import {initialOpenAiState} from './open-ai.state';

export const openAiReducer = createReducer(
    initialOpenAiState,
    on(OpenAiActions.complete, (state, {prompt, maxTokens, temperature}) => {
        return {
            ...state,
            completion: {
                maxTokens: maxTokens,
                prompt: prompt,
                result: '',
                temperature: temperature
            }
        };
    }),
    on(OpenAiActions.completeSuccess, (state, {text}) => {
        return {
            ...state,
            completion: {
                ...state.completion,
                result: text
            }
        };
    }),
    on(OpenAiActions.moderate, (state, {input}) => {
        return {
            ...state,
            moderation: {
                input,
                result: state.moderation.result
            }
        }
    }),
    on(OpenAiActions.moderateSuccess, (state, {moderation}) => {
        return {
            ...state,
            moderation: {
                input: state.moderation.input,
                result: moderation
            }
        }
    }),
    on(OpenAiActions.resetState, (state, {prompt}) => {
        return {
            ...initialOpenAiState,
            completion: {
                maxTokens: 256,
                prompt: prompt,
                result: '',
                temperature: 0
            }
        }
    })
);
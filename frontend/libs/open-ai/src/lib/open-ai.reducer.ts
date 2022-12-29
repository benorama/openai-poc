import {createReducer, on} from '@ngrx/store';
import {OpenAiActions} from './open-ai.actions';
import {initialOpenAiState} from "./open-ai.state";

export const openAiReducer = createReducer(
    initialOpenAiState,
    on(OpenAiActions.complete, (state, {prompt, temperature}) => {
        return {
            ...state,
            completion: {
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
    on(OpenAiActions.moderate, (state) => state),
    on(OpenAiActions.moderateSuccess, (state) => state),
    on(OpenAiActions.resetState, (state, {prompt}) => {
        return {
            ...initialOpenAiState,
            completion: {
                prompt: prompt,
                result: '',
                temperature: 0
            }
        }
    })
);
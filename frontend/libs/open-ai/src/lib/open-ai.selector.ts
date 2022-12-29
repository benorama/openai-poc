import {createSelector, createFeatureSelector} from '@ngrx/store';
import {OpenAiState} from "open-ai";

export const featureKey = 'openAi';
export const selectOpenAiState = createFeatureSelector<OpenAiState>(featureKey);

export const selectOpenAiCompletion = createSelector(
    selectOpenAiState,
    (openAiState) => openAiState.completion
)

export const selectOpenAiModeration = createSelector(
    selectOpenAiState,
    (openAiState) => openAiState.moderation
)
import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ModerationResult} from "./open-ai-moderation-result.model";

export const OpenAiActions = createActionGroup({
    source: 'Open AI',
    events: {
        'Complete': props<{ prompt: string, temperature: number }>(),
        'Complete failure': props<{ error: any }>(),
        'Complete success': props<{ text: string }>(),
        'Moderate': props<{ input: string }>(),
        'Moderate failure': props<{ error: any }>(),
        'Moderate success': props<{ moderation: ModerationResult }>(),
        'Reset state': props<{ prompt: string }>()
    }
})
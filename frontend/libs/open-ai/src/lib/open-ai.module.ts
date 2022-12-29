import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {OpenAiEffects} from "./open-ai.effects";
import {openAiReducer} from "./open-ai.reducer";
import {featureKey} from "./open-ai.selector";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        StoreModule.forFeature(featureKey, openAiReducer),
        EffectsModule.forFeature([OpenAiEffects])
    ],
    exports: []
})
export class OpenAiModule {
}

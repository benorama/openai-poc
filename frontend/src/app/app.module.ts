import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {OpenAiModule} from "open-ai";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NameMyPetComponent} from './name-my-pet/name-my-pet.component';
import {TweetClassifierComponent} from './tweet-classifier/tweet-classifier.component';
import {HomeComponent} from './home/home.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ChatComponent} from './chat/chat.component';

@NgModule({
    declarations: [
        AppComponent,
        NameMyPetComponent,
        TweetClassifierComponent,
        HomeComponent,
        ChatComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        OpenAiModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

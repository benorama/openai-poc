import {Component, OnInit} from '@angular/core';
import {AbstractDestroyable} from "../abstract-destroyable";
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {OpenAiActions, selectOpenAiCompletion} from "open-ai";

@Component({
    selector: 'tweet-classifier',
    templateUrl: './tweet-classifier.component.html',
    styleUrls: ['./tweet-classifier.component.css']
})
export class TweetClassifierComponent extends AbstractDestroyable implements OnInit {

    result: string = '';

    tweetForm = new FormGroup({
        tweet: new FormControl(''),
    });

    constructor(private store: Store) {
        super();
    }

    ngOnInit() {
        this.store.dispatch(OpenAiActions.resetState({prompt: this.generatePrompt('')}));
        this.takeUntilDestroy(this.store.select(selectOpenAiCompletion)).subscribe((completion) => {
            this.result = completion.result;
        });
    }

    onSubmit() {
        const tweet: string = this.tweetForm.controls.tweet.value ?? '';
        this.store.dispatch(OpenAiActions.complete({
                prompt: this.generatePrompt(tweet),
                temperature: 0
            }
        ))
    }

    private generatePrompt(tweet: string): string {
        return `Decide whether a Tweet's sentiment is positive, neutral, or negative on a scale from 0 to 1.
    Tweet:` + tweet;
    }

}

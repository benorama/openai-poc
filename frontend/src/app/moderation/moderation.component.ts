import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {OpenAiActions, selectOpenAiCompletion, selectOpenAiModeration} from "open-ai";
import {AbstractDestroyable} from "../abstract-destroyable";
import {ModerationResult} from "../../../libs/open-ai/src/lib/open-ai-moderation-result.model";

@Component({
    selector: 'moderation',
    templateUrl: './moderation.component.html',
    styleUrls: ['./moderation.component.css']
})
export class ModerationComponent extends AbstractDestroyable implements OnInit {

    moderationResult: ModerationResult = new ModerationResult();

    moderationForm = new FormGroup({
        input: new FormControl(''),
    });

    constructor(private store: Store) {
        super();
    }

    ngOnInit() {
        this.store.dispatch(OpenAiActions.resetState({prompt: ''}));
        this.takeUntilDestroy(this.store.select(selectOpenAiModeration)).subscribe((moderation) => {
            this.moderationResult = moderation.result;
        });
    }

    onSubmit() {
        const input: string = this.moderationForm.controls.input.value ?? '';
        this.store.dispatch(OpenAiActions.moderate({
                input: input
            }
        ))
    }
}

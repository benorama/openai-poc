import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {OpenAiApiService} from "./open-ai-api.service";
import {OpenAiActions} from "./open-ai.actions";

@Injectable()
export class OpenAiEffects {

    constructor(
        private actions$: Actions,
        private openAiApiService: OpenAiApiService
    ) {
    }

    complete$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(OpenAiActions.complete),
                mergeMap((action) =>
                    this.openAiApiService.complete(
                        action.prompt,
                        action.temperature
                    ).pipe(
                        map((result: any) =>
                            OpenAiActions.completeSuccess({
                                text: result.text
                            })
                        ),
                        catchError((error: HttpErrorResponse) =>
                            of(OpenAiActions.completeFailure(error))
                        )
                    )
                )
            )
        }
    );
}
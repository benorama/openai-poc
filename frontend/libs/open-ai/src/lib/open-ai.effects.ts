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
                        action.maxTokens,
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

    moderate$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(OpenAiActions.moderate),
                mergeMap((action) =>
                    this.openAiApiService.moderate(
                        action.input
                    ).pipe(
                        map((result: any) =>
                            OpenAiActions.moderateSuccess({
                                moderation: {
                                    flagged: result.moderations[0].flagged,
                                    categories: {
                                        hate: result.moderations[0]['categories']['hate'],
                                        hateThreatening: result.moderations[0]['categories']['hate/threatening'],
                                        selfHarm: result.moderations[0]['categories']['self-harm'],
                                        sexual: result.moderations[0]['categories']['sexual'],
                                        sexualMinors: result.moderations[0]['categories']['sexual/minors'],
                                        violence: result.moderations[0]['categories']['violence'],
                                        violenceGraphic: result.moderations[0]['categories']['violence/graphic']
                                    },
                                    categoryScores: {
                                        hate: result.moderations[0]['categoryScores']['hate'],
                                        hateThreatening: result.moderations[0]['categoryScores']['hate/threatening'],
                                        selfHarm: result.moderations[0]['categoryScores']['self-harm'],
                                        sexual: result.moderations[0]['categoryScores']['sexual'],
                                        sexualMinors: result.moderations[0]['categoryScores']['sexual/minors'],
                                        violence: result.moderations[0]['categoryScores']['violence'],
                                        violenceGraphic: result.moderations[0]['categoryScores']['violence/graphic']
                                    }
                                }
                            })
                        ),
                        catchError((error: HttpErrorResponse) =>
                            of(OpenAiActions.moderateFailure(error))
                        )
                    )
                )
            )
        }
    );
}
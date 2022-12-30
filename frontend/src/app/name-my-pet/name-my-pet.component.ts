import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {OpenAiActions, selectOpenAiCompletion} from "open-ai";
import {AbstractDestroyable} from "../abstract-destroyable";

@Component({
    selector: 'name-my-pet',
    templateUrl: './name-my-pet.component.html',
    styleUrls: ['./name-my-pet.component.css']
})
export class NameMyPetComponent extends AbstractDestroyable implements OnInit {

    result: string = '';

    animalForm = new FormGroup({
        animalName: new FormControl(''),
        superHero: new FormControl(false),
        creative: new FormControl(false)
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
        const animalName: string = this.animalForm.controls.animalName.value ?? '';
        const superHero: boolean = !!this.animalForm.controls.superHero.value ?? false;
        const creative: boolean = !!this.animalForm.controls.creative.value ?? false;
        this.store.dispatch(OpenAiActions.complete({
                maxTokens: 256,
                prompt: this.generatePrompt(animalName, superHero),
                temperature: creative ? 1 : 0
            }
        ))
    }

    private generatePrompt(animalName: string, superhero: boolean = false): string {
        return `Suggest three names for an animal` + (superhero ? ' that is a superhero.' : '.')
            + `
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${this.capitalize(animalName)}
Names:`;
    }

    private capitalize(str: string = "", lowerRest = false): string {
        return str.slice(0, 1).toUpperCase() +
            (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
    }
}

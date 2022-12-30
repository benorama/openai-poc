import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectOpenAiCompletion} from "open-ai";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

    maxTokens = 256;
    prompt = '';
    temperature = 0;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.select(selectOpenAiCompletion).subscribe((completion) => {
            this.maxTokens = completion.maxTokens;
            this.prompt = completion.prompt;
            this.temperature = completion.temperature;
        });
    }

}

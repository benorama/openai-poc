import {Component} from '@angular/core';
import {selectOpenAiCompletion} from "open-ai";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    prompt = '';
    temperature = 0;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.select(selectOpenAiCompletion).subscribe((completion) => {
            this.prompt = completion.prompt;
            this.temperature = completion.temperature;
        });
    }
}

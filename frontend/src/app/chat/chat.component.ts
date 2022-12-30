import {Component, OnInit} from '@angular/core';
import {AbstractDestroyable} from "../abstract-destroyable";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {OpenAiActions, selectOpenAiCompletion} from "open-ai";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends AbstractDestroyable implements OnInit {

  result: string = '';

  availableTones: string[] = [
    'happy',
    'fearful',
    'angry'
  ]

  chatForm = new FormGroup({
    question: new FormControl(''),
    tones: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(OpenAiActions.resetState({prompt: this.generatePrompt('')}));
    this.takeUntilDestroy(this.store.select(selectOpenAiCompletion)).subscribe((completion) => {
      this.result = completion.result;
    });
  }

  onChange(tone: string, checked: boolean) {
    const tones = (this.chatForm.controls.tones as FormArray);

    if (checked) {
      tones.push(new FormControl(tone));
    } else {
      const index = tones.controls.findIndex(x => x.value === tone);
      tones.removeAt(index);
    }
  }

  onSubmit() {
    const question: string = this.chatForm.controls.question.value ?? '';
    const tones: string[] = this.chatForm.value.tones as string[];
    const prompt: string = this.generatePrompt(question, tones);
    this.store.dispatch(OpenAiActions.complete({
          prompt: prompt,
          temperature: 0
        }
    ))
  }

  private generatePrompt(question: string, tones: string[] = []): string {
    return `The following is a conversation with an AI assistant.` + (tones.length ? `The assistant is ` + tones.join(', ') +  `.` : ``) +
`

Human: Hello, who are you?
AI: I am an AI created by OpenAI. How can I help you today?
Human:` + question + `.
AI:`;
  }
}
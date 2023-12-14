import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { DialogType } from "../app.component";
import { StorageService } from "../storage.service";

@Component({
  selector: "create-poll-form",
  standalone: true,
  templateUrl: "./create-poll-form.component.html",
})
export class CreatePollFormComponent {
  #storage = inject(StorageService);

  @Input() dialog!: WritableSignal<DialogType>;

  title = signal<string>("");
  onTitleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.title.set(input.value);
  }

  description = signal<string>("");
  onDescriptionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.description.set(input.value);
  }

  multipleResult = signal<boolean>(false);
  toggleMultipleResult() {
    this.multipleResult.update((v) => !v);
  }

  createPoll() {
    this.#storage.putPoll({
      pollId: crypto.randomUUID(),
      title: this.title(),
      description: this.description(),
      multipleResult: this.multipleResult(),
      options: [],
      votes: [],
    });
    this.dialog.set("");
  }
}

import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { PollControllerService } from "../api/services";
import { DialogType } from "../app.component";
import { StorageService } from "../storage.service";

@Component({
  selector: "create-poll-form",
  standalone: true,
  templateUrl: "./create-poll-form.component.html",
})
export class CreatePollFormComponent {
  #storage = inject(StorageService);
  #pollProvider = inject(PollControllerService);

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

  createPoll() {
    const body = {
      pollId: crypto.randomUUID(),
      title: this.title(),
      description: this.description(),
      multipleResult: this.multipleResult(),
      options: [],
      votes: [],
    };
    this.#pollProvider.putPoll({ body }).subscribe((v) => {
      this.#storage.polls.update((p) => [...p, v]);
      this.dialog.set("");
    });
  }
}

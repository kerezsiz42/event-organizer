import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { PollOutput } from "../api/models";
import { PollControllerService } from "../api/services";
import { DialogType } from "../app.component";

@Component({
  selector: "create-poll-form",
  standalone: true,
  templateUrl: "./create-poll-form.component.html",
})
export class CreatePollFormComponent {
  @Input() polls!: WritableSignal<PollOutput[]>;
  @Input() dialog!: WritableSignal<DialogType>;

  #pollProvider = inject(PollControllerService);

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
    this.#pollProvider.putPoll({ body }).subscribe((v) =>
      this.polls.update((p) => {
        this.dialog.set("");
        return [...p, v];
      })
    );
  }
}

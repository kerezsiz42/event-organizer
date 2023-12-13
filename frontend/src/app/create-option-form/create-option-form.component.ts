import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { OptionControllerService } from "../api/services";
import { DialogType } from "../app.component";
import { StorageService } from "../storage.service";

@Component({
  selector: "create-option-form",
  standalone: true,
  templateUrl: "./create-option-form.component.html",
})
export class CreateOptionFormComponent {
  #storage = inject(StorageService);
  #optionProvider = inject(OptionControllerService);

  @Input() dialog!: WritableSignal<DialogType>;
  @Input() selectedPollId!: WritableSignal<string>;

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

  price = signal<number>(0);
  onPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.price.set(parseInt(input.value));
  }

  createOption() {
    const body = {
      optionId: crypto.randomUUID(),
      title: this.title(),
      description: this.description(),
      price: this.price(),
      votes: [],
      poll: this.selectedPollId(),
    };
    this.#optionProvider.putOption({ body }).subscribe((o) => {
      this.#storage.optionsByPollIds.update((obp) => ({
        ...obp,
        [this.selectedPollId()]: [...obp[this.selectedPollId()], o],
      }));
      this.dialog.set("");
      this.selectedPollId.set("");
    });
  }
}

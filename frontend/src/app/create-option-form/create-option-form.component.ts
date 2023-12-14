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
  selector: "create-option-form",
  standalone: true,
  templateUrl: "./create-option-form.component.html",
})
export class CreateOptionFormComponent {
  #storage = inject(StorageService);

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
    this.#storage.putOption({
      optionId: crypto.randomUUID(),
      title: this.title(),
      description: this.description(),
      price: this.price(),
      votes: [],
      poll: this.selectedPollId(),
    });
    this.dialog.set("");
    this.selectedPollId.set("");
  }
}

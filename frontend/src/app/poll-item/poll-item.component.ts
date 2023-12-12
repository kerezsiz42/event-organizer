import {
  Component,
  Input,
  WritableSignal,
  effect,
  inject,
  signal,
} from "@angular/core";
import { OptionOutput, PollOutput } from "../api/models";
import { OptionControllerService } from "../api/services";
import { OptionItemComponent } from "../option-item/option-item.component";
import { DialogType } from "../app.component";

@Component({
  selector: "poll-item",
  standalone: true,
  templateUrl: "./poll-item.component.html",
  imports: [OptionItemComponent],
})
export class PollItemComponent {
  #optionProvider = inject(OptionControllerService);
  #voteProvider = inject(OptionControllerService);

  @Input() poll!: PollOutput;
  @Input() dialog!: WritableSignal<DialogType>;

  options = signal<OptionOutput[]>([]);

  constructor() {
    effect(() => {
      for (const id of this.poll.options) {
        this.#optionProvider.getOption({ id }).subscribe((o) => {
          this.options.update((os) => [...os, o]);
        });
      }
    });
  }
}

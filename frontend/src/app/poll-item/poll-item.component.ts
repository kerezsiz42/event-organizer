import {
  Component,
  Input,
  WritableSignal,
  computed,
  inject,
} from "@angular/core";
import { OptionItemComponent } from "../option-item/option-item.component";
import { DialogType } from "../app.component";
import { StorageService } from "../storage.service";
import { OptionOutput, PollOutput } from "../api/models";

@Component({
  selector: "poll-item",
  standalone: true,
  templateUrl: "./poll-item.component.html",
  imports: [OptionItemComponent],
})
export class PollItemComponent {
  #storage = inject(StorageService);

  @Input() dialog!: WritableSignal<DialogType>;
  @Input() poll!: PollOutput;
  @Input() selectedPollId!: WritableSignal<string>;
  @Input() username!: WritableSignal<string>;

  options = computed(
    () => this.#storage.optionsByPollIds()[this.poll.pollId] ?? []
  );

  onAddOption() {
    this.selectedPollId.set(this.poll.pollId);
    this.dialog.set("createOption");
  }

  onDeletePoll() {
    this.#storage.deletePoll(this.poll);
  }
}

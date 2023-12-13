import { Component, Input, WritableSignal, inject } from "@angular/core";
import { OptionItemComponent } from "../option-item/option-item.component";
import { DialogType } from "../app.component";
import { StorageService } from "../storage.service";
import { PollOutput } from "../api/models";
import { PollControllerService } from "../api/services";

@Component({
  selector: "poll-item",
  standalone: true,
  templateUrl: "./poll-item.component.html",
  imports: [OptionItemComponent],
})
export class PollItemComponent {
  storage = inject(StorageService);
  #pollProvider = inject(PollControllerService);

  @Input() dialog!: WritableSignal<DialogType>;
  @Input() poll!: PollOutput;
  @Input() selectedPollId!: WritableSignal<string>;

  onAddOption() {
    this.selectedPollId.set(this.poll.pollId);
    this.dialog.set("createOption");
  }

  onDeletePoll() {}
}

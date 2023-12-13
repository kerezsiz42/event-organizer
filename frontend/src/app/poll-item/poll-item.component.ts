import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
} from "@angular/core";
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
export class PollItemComponent implements OnInit {
  storage = inject(StorageService);
  #pollProvider = inject(PollControllerService);

  @Input() dialog!: WritableSignal<DialogType>;
  @Input() poll!: PollOutput;
  @Input() selectedPollId!: WritableSignal<string>;

  onAddOption() {
    this.selectedPollId.set(this.poll.pollId);
    this.dialog.set("createOption");
  }

  onDeletePoll() {
    this.#pollProvider.deletePoll({ id: this.poll.pollId }).subscribe(() => {
      this.storage.polls.update((ps) =>
        ps.filter((p) => p.pollId !== this.poll.pollId)
      );
      this.storage.syncOptionsAndVotes(this.poll);
    });
  }

  ngOnInit() {
    this.storage.syncOptionsAndVotes(this.poll);
  }
}

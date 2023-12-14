import {
  Component,
  Input,
  WritableSignal,
  computed,
  inject,
} from "@angular/core";
import { OptionOutput } from "../api/models";
import { StorageService } from "../storage.service";

@Component({
  selector: "option-item",
  standalone: true,
  templateUrl: "./option-item.component.html",
})
export class OptionItemComponent {
  #storage = inject(StorageService);

  @Input() option!: OptionOutput;
  @Input() username!: WritableSignal<string>;
  @Input() isMultipleResult!: boolean;

  isWinning = computed(() => {
    const voteCount = this.#storage.voteCountByOptionId()[this.option.optionId];
    return (
      voteCount !== 0 &&
      this.#storage.maxVoteCountsByPollId()[this.option.poll] === voteCount
    );
  });

  votes = computed(
    () => this.#storage.votesByOptionIds()[this.option.optionId] ?? []
  );

  votedUsers = computed(() =>
    this.votes()
      .map(({ username }) => username)
      .sort()
      .join(", ")
  );

  voteIfVoted = computed(() => {
    if (this.username() === "") {
      return undefined;
    }
    return this.votes().find((v) => v.username === this.username());
  });

  onToggleVote() {
    const vote = this.voteIfVoted();
    if (vote) {
      this.#storage.deleteVote(vote.voteId, this.option.optionId);
    } else {
      const vote = {
        voteId: crypto.randomUUID(),
        option: this.option.optionId,
        poll: this.option.poll,
        username: this.username(),
      };
      this.#storage.putVote(this.option.optionId, vote);
    }
  }

  onRemoveOption() {
    this.#storage.deleteOption(this.option.optionId, this.option.poll);
  }
}

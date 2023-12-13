import { Injectable, inject, signal } from "@angular/core";
import { OptionOutput, PollOutput, VoteOutput } from "./api/models";
import {
  OptionControllerService,
  PollControllerService,
  VoteControllerService,
} from "./api/services";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  #optionProvider = inject(OptionControllerService);
  #voteProvider = inject(VoteControllerService);
  #pollProvider = inject(PollControllerService);

  polls = signal<PollOutput[]>([]);
  optionsByPollIds = signal<Record<string, OptionOutput[]>>({});
  votesByOptionIds = signal<Record<string, VoteOutput[]>>({});

  syncPolls() {
    this.#pollProvider.getPolls().subscribe((v) => this.polls.set(v));
  }

  syncOptionsAndVotes(poll: PollOutput) {
    for (const optionId of poll.options) {
      this.#optionProvider.getOption({ id: optionId }).subscribe((o) => {
        this.optionsByPollIds.update((obp) => ({
          ...obp,
          [poll.pollId]: [...(obp?.[poll.pollId] ?? []), o],
        }));
        this.syncVotes(o);
      });
    }
  }

  syncVotes(option: OptionOutput) {
    for (const voteId of option.votes) {
      this.#voteProvider.getVote({ id: voteId }).subscribe((v) => {
        this.votesByOptionIds.update((vbo) => ({
          ...vbo,
          [option.optionId]: [...(vbo?.[option.optionId] ?? []), v],
        }));
      });
    }
  }
}

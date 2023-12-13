import { Injectable, inject, signal } from "@angular/core";
import {
  OptionInput,
  OptionOutput,
  PollInput,
  PollOutput,
  VoteInput,
  VoteOutput,
} from "./api/models";
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
    this.#pollProvider.getPolls().subscribe((ps) => {
      this.polls.set(ps);
      for (const p of ps) {
        this.syncOptions(p);
      }
    });
  }

  syncOptions(poll: PollOutput) {
    for (const optionId of poll.options) {
      this.#optionProvider.getOption({ id: optionId }).subscribe((o) => {
        this.putOption(poll.pollId, o);
        this.syncVotes(o);
      });
    }
  }

  syncVotes(option: OptionOutput) {
    for (const voteId of option.votes) {
      this.#voteProvider.getVote({ id: voteId }).subscribe((v) => {
        this.putVote(option.optionId, v);
      });
    }
  }

  putPoll(poll: PollInput) {
    return this.#pollProvider.putPoll({ body: poll }).subscribe((p) => {
      this.polls.update((ps) => [...ps, p]);
    });
  }

  deletePoll(poll: PollOutput) {
    return this.#pollProvider.deletePoll({ id: poll.pollId }).subscribe(() => {
      for (const optionId of poll.options) {
        this.votesByOptionIds.update((vbo) => {
          delete vbo[optionId];
          return vbo;
        });
      }
      this.optionsByPollIds.update((obp) => {
        delete obp[poll.pollId];
        return obp;
      });
      this.polls.update((ps) => ps.filter((p) => p.pollId !== poll.pollId));
    });
  }

  putOption(pollId: string, option: OptionInput) {
    return this.#optionProvider.putOption({ body: option }).subscribe((o) => {
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [pollId]: [...(obp?.[pollId] ?? []), o],
      }));
    });
  }

  deleteOption(optionId: string, pollId: string) {
    return this.#optionProvider.deleteOption({ id: optionId }).subscribe(() => {
      this.votesByOptionIds.update((vbo) => {
        delete vbo[optionId];
        return vbo;
      });
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [pollId]: obp[pollId].filter((o) => o.optionId !== optionId),
      }));
    });
  }

  putVote(optionId: string, vote: VoteInput) {
    return this.#voteProvider.putVote({ body: vote }).subscribe((v) => {
      this.votesByOptionIds.update((vbo) => ({
        ...vbo,
        [optionId]: [...(vbo?.[optionId] ?? []), v],
      }));
    });
  }

  deleteVote(voteId: string, optionId: string) {
    return this.#voteProvider.deleteVote({ id: voteId }).subscribe(() => {
      this.votesByOptionIds.update((vbo) => ({
        ...vbo,
        [optionId]: vbo[optionId].filter((o) => o.voteId !== voteId),
      }));
    });
  }
}

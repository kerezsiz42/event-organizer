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

  sync() {
    return this.#pollProvider.getPolls().subscribe((ps) => {
      this.polls.set(ps);
      for (const p of ps) {
        for (const optionId of p.options) {
          this.getOption(optionId);
        }
        for (const voteId of p.votes) {
          this.getVote(voteId);
        }
      }
    });
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
          const { [optionId]: _, ...rest } = vbo;
          return rest;
        });
      }
      this.optionsByPollIds.update((obp) => {
        const { [poll.pollId]: _, ...rest } = obp;
        return rest;
      });
      this.polls.update((ps) => ps.filter((p) => p.pollId !== poll.pollId));
    });
  }

  getOption(optionId: string) {
    return this.#optionProvider.getOption({ id: optionId }).subscribe((o) => {
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [o.poll]: [...(obp?.[o.poll] ?? []), o],
      }));
    });
  }

  putOption(option: OptionInput) {
    return this.#optionProvider.putOption({ body: option }).subscribe((o) => {
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [option.poll]: [...(obp?.[option.poll] ?? []), o],
      }));
    });
  }

  deleteOption(optionId: string, pollId: string) {
    return this.#optionProvider.deleteOption({ id: optionId }).subscribe(() => {
      this.votesByOptionIds.update((vbo) => {
        const { [optionId]: _, ...rest } = vbo;
        return rest;
      });
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [pollId]: obp[pollId].filter((o) => o.optionId !== optionId),
      }));
    });
  }

  getVote(voteId: string) {
    return this.#voteProvider.getVote({ id: voteId }).subscribe((v) => {
      this.votesByOptionIds.update((vbo) => ({
        ...vbo,
        [v.option]: [...(vbo?.[v.option] ?? []), v],
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

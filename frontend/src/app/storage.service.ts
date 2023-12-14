import { Injectable, computed, inject, signal } from "@angular/core";
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

  allVotes = computed(() => Object.values(this.votesByOptionIds()).flat());
  allOptions = computed(() => Object.values(this.optionsByPollIds()).flat());

  voteCountByOptionId = computed<Record<string, number>>(() =>
    this.allOptions().reduce(
      (acc, { optionId }) => ({
        ...acc,
        [optionId]: this.votesByOptionIds()[optionId]?.length ?? 0,
      }),
      {}
    )
  );

  maxVoteCountsByPollId = computed<Record<string, number>>(() =>
    this.polls().reduce((acc, poll) => {
      return {
        ...acc,
        [poll.pollId]: this.optionsByPollIds()[poll.pollId].reduce(
          (a, { optionId }) => {
            const voteCount = this.voteCountByOptionId()[optionId];
            return a > voteCount ? a : voteCount;
          },
          0
        ),
      };
    }, {})
  );

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
        this.votesByOptionIds.update(this.#omit(optionId));
      }
      this.optionsByPollIds.update(this.#omit(poll.pollId));
      this.polls.update((ps) => ps.filter((p) => p.pollId !== poll.pollId));
    });
  }

  #omit = (k: string) => (r: { [key: string]: any }) => {
    const { [k]: _, ...rest } = r;
    return rest;
  };

  getOption(optionId: string) {
    return this.#optionProvider.getOption({ id: optionId }).subscribe((o) => {
      this.#addOption(o);
    });
  }

  putOption(option: OptionInput) {
    return this.#optionProvider.putOption({ body: option }).subscribe((o) => {
      this.#addOption(o);
    });
  }

  #addOption(o: OptionOutput) {
    this.optionsByPollIds.update((obp) => ({
      ...obp,
      [o.poll]: [...(obp?.[o.poll] ?? []), o],
    }));
  }

  deleteOption(optionId: string, pollId: string) {
    return this.#optionProvider.deleteOption({ id: optionId }).subscribe(() => {
      this.votesByOptionIds.update(this.#omit(optionId));
      this.optionsByPollIds.update((obp) => ({
        ...obp,
        [pollId]: obp[pollId].filter((o) => o.optionId !== optionId),
      }));
    });
  }

  getVote(voteId: string) {
    return this.#voteProvider.getVote({ id: voteId }).subscribe((v) => {
      this.#addVote(v, v.option);
    });
  }

  putVote(optionId: string, vote: VoteInput) {
    return this.#voteProvider.putVote({ body: vote }).subscribe((v) => {
      this.#addVote(v, optionId);
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

  #addVote(v: VoteOutput, optionId: string) {
    this.votesByOptionIds.update((vbo) => ({
      ...vbo,
      [optionId]: [...(vbo?.[optionId] ?? []), v],
    }));
  }
}

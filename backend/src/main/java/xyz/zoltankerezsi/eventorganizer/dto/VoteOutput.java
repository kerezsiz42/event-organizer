package xyz.zoltankerezsi.eventorganizer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import xyz.zoltankerezsi.eventorganizer.model.Vote;

@Getter
@Setter
@AllArgsConstructor
public class VoteOutput {
    @NotNull
    private String voteId;
    @NotNull
    private String username;
    @NotNull
    private String poll;
    @NotNull
    private String option;

    public static VoteOutput fromVote(Vote vote) {
        return new VoteOutput(vote.getVoteId(), vote.getUsername(), vote.getPoll().getPollId(),
                vote.getOption().getOptionId());
    }
}

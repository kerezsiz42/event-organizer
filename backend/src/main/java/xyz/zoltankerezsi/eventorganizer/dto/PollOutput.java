package xyz.zoltankerezsi.eventorganizer.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import xyz.zoltankerezsi.eventorganizer.model.Option;
import xyz.zoltankerezsi.eventorganizer.model.Poll;
import xyz.zoltankerezsi.eventorganizer.model.Vote;

@Getter
@Setter
@AllArgsConstructor
public class PollOutput {
    @NotNull
    private String pollId;
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private Boolean multipleChoice;
    @NotNull
    private List<String> options;
    @NotNull
    private List<String> votes;

    public static PollOutput fromPoll(Poll poll) {
        String pollId = poll.getPollId();
        String title = poll.getTitle();
        String description = poll.getDescription();
        Boolean multipleChoice = poll.getMultipleChoice();
        List<String> options = poll
                .getOptions()
                .stream()
                .map(Option::getOptionId)
                .toList();
        List<String> votes = poll
                .getVotes()
                .stream()
                .map(Vote::getVoteId)
                .toList();
        return new PollOutput(pollId, title, description, multipleChoice, options, votes);
    }
}

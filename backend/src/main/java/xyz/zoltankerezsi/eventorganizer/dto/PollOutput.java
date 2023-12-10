package xyz.zoltankerezsi.eventorganizer.dto;

import java.util.List;
import java.util.UUID;

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
    private String pollId;
    private String title;
    private String description;
    private Long finalCost;
    private Boolean multipleChoice;
    private List<String> options;
    private List<String> votes;

    public static PollOutput fromPoll(Poll poll) {
        String pollId = poll.getPollId().toString();
        String title = poll.getTitle();
        String description = poll.getDescription();
        Long finalCost = poll.getFinalCost();
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
        return new PollOutput(pollId, title, description, finalCost, multipleChoice, options, votes);
    }
}

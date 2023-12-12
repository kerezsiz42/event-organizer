package xyz.zoltankerezsi.eventorganizer.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import xyz.zoltankerezsi.eventorganizer.model.Option;
import xyz.zoltankerezsi.eventorganizer.model.Vote;

@Getter
@Setter
@AllArgsConstructor
public class OptionOutput {
    @NotNull
    private String optionId;
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private Long price;
    @NotNull
    private String poll;
    @NotNull
    private List<String> votes;

    public static OptionOutput fromOption(Option option) {
        String optionId = option.getOptionId();
        String title = option.getTitle();
        String description = option.getDescription();
        Long price = option.getPrice();
        String poll = option.getPoll().getPollId();
        List<String> votes = option
                .getVotes()
                .stream()
                .map(Vote::getVoteId)
                .toList();
        return new OptionOutput(optionId, title, description, price, poll, votes);
    }
}
package xyz.zoltankerezsi.eventorganizer.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import xyz.zoltankerezsi.eventorganizer.Constants;

@Getter
@Setter
public class PollInput {
    @Pattern(regexp = Constants.UUID_REGEX, message = "Invalid UUID format")
    private String pollId;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @PositiveOrZero(message = "FinalCost should be non-negative")
    private Long finalCost;

    @NotNull(message = "MultipleChoice must not be null")
    private Boolean multipleChoice;

    @NotNull(message = "Options must not be null")
    private List<@Pattern(regexp = Constants.UUID_REGEX, message = "Invalid UUID format") String> options;

    @NotNull(message = "Votes must not be null")
    private List<@Pattern(regexp = Constants.UUID_REGEX, message = "Invalid UUID format") String> votes;
}

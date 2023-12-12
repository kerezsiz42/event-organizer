package xyz.zoltankerezsi.eventorganizer.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import xyz.zoltankerezsi.eventorganizer.Constants;

@ToString
@Getter
@Setter
public class PollInput {
    @NotBlank(message = "mandatory field")
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String pollId;

    @NotBlank(message = "mandatory field")
    private String title;

    @NotBlank(message = "mandatory field")
    private String description;

    @NotNull(message = "must not be null")
    private Boolean multipleChoice;

    @NotNull(message = "must not be null")
    private List<@Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format") String> options;

    @NotNull(message = "must not be null")
    private List<@Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format") String> votes;
}

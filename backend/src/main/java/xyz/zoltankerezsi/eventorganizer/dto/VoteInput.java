package xyz.zoltankerezsi.eventorganizer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import xyz.zoltankerezsi.eventorganizer.Constants;

@Getter
@Setter
public class VoteInput {
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String voteId;

    @NotBlank(message = "mandatory field")
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String poll;

    @NotNull(message = "must not be null")
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String option;
}
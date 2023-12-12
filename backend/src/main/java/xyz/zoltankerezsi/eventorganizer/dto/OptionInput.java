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
public class OptionInput {
    @NotBlank(message = "mandatory field")
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String optionId;

    @NotBlank(message = "mandatory field")
    private String title;

    @NotBlank(message = "mandatory field")
    private String description;

    @NotNull(message = "cannot be null")
    @PositiveOrZero(message = "cannot be negative")
    private Long price;

    @NotBlank(message = "mandatory field")
    @Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format")
    private String poll;

    @NotNull(message = "must not be null")
    private List<@Pattern(regexp = Constants.UUID_REGEX, message = "invalid UUID format") String> votes;
}

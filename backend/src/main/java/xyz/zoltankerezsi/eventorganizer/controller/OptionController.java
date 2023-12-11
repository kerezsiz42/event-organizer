package xyz.zoltankerezsi.eventorganizer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import xyz.zoltankerezsi.eventorganizer.dto.OptionInput;
import xyz.zoltankerezsi.eventorganizer.dto.OptionOutput;
import xyz.zoltankerezsi.eventorganizer.model.Option;
import xyz.zoltankerezsi.eventorganizer.model.Poll;
import xyz.zoltankerezsi.eventorganizer.model.Vote;
import xyz.zoltankerezsi.eventorganizer.repository.OptionRepository;
import xyz.zoltankerezsi.eventorganizer.repository.PollRepository;
import xyz.zoltankerezsi.eventorganizer.repository.VoteRepository;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/options", produces = "application/json")
class OptionController {
    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private VoteRepository voteRepository;

    @GetMapping("/{id}")
    ResponseEntity<OptionOutput> getOption(@PathVariable(value = "id") final String optionId) {
        return optionRepository.findById(optionId)
                .map(OptionOutput::fromOption)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, optionId));
    }

    @PutMapping
    ResponseEntity<OptionOutput> putOption(@Valid @RequestBody final OptionInput o) {
        List<Vote> votes = new ArrayList<>();
        voteRepository.findAllById(o.getVotes()).forEach(votes::add);
        Optional<Poll> poll = pollRepository.findById(o.getPoll());
        if (poll.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("% not found", o.getPoll()));
        }
        Option option = new Option(o.getOptionId(), o.getTitle(), o.getDescription(), o.getPrice(), poll.get(), votes);
        optionRepository.save(option);
        return ResponseEntity.ok(OptionOutput.fromOption(option));
    }

    @Operation(summary = "Kitöröl egy option objektumot id alapján idempotens módon")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Kitöröl egy option objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett. A hivatkozó objektumokból is kitörli a rá mutatő referenciát.", content = {
                    @Content(schema = @Schema(implementation = String.class)) }) })
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteOption(@PathVariable(value = "id") final String optionId) {
        optionRepository.deleteById(optionId);
        return ResponseEntity.ok(String.format("\"%s\"", optionId));
    }
}

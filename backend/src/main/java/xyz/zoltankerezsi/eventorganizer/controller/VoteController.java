package xyz.zoltankerezsi.eventorganizer.controller;

import java.util.Optional;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import xyz.zoltankerezsi.eventorganizer.dto.VoteInput;
import xyz.zoltankerezsi.eventorganizer.dto.VoteOutput;
import xyz.zoltankerezsi.eventorganizer.model.Option;
import xyz.zoltankerezsi.eventorganizer.model.Poll;
import xyz.zoltankerezsi.eventorganizer.model.Vote;
import xyz.zoltankerezsi.eventorganizer.repository.OptionRepository;
import xyz.zoltankerezsi.eventorganizer.repository.PollRepository;
import xyz.zoltankerezsi.eventorganizer.repository.VoteRepository;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/votes", produces = "application/json")
class VoteController {
        @Autowired
        private PollRepository pollRepository;

        @Autowired
        private OptionRepository optionRepository;

        @Autowired
        private VoteRepository voteRepository;

        @Operation(summary = "Lekérdez egy vote objektumot id alapján")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Visszaadja a vote objektumot az adatbázisból, ha létezik.", content = {
                                        @Content(schema = @Schema(implementation = VoteOutput.class)) }),
                        @ApiResponse(responseCode = "404", description = "Ha a vote objektum nem található.", content = @Content(schema = @Schema(implementation = String.class))) })
        @GetMapping("/{id}")
        ResponseEntity<VoteOutput> getVote(@PathVariable(value = "id") final String voteId) {
                return voteRepository.findById(voteId)
                                .map(VoteOutput::fromVote)
                                .map(ResponseEntity::ok)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, voteId));
        }

        @Operation(summary = "Frissít vagy beilleszt egy vote objektumot az adatbázisba")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Validálja a bejövő vote objektum adatait, majd frissítit a vote objektumot, ha ugyanolyan id-val már létezik az adatbázisban, különben beilleszt egy újat.", content = {
                                        @Content(schema = @Schema(implementation = VoteOutput.class)) }),
                        @ApiResponse(responseCode = "400", description = "Működésbe lép, ha a vote objektum bármely mezője a validációnak nem megfelelő formátumú. Visszaküldi a hibás mezőket és a hibákat egy JSON objektumban.", content = @Content(schema = @Schema(implementation = Map.class))) })
        @PutMapping
        ResponseEntity<VoteOutput> putVote(@Valid @RequestBody final VoteInput v) {
                Optional<Poll> poll = pollRepository.findById(v.getPoll());
                if (poll.isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                        String.format("% not found", v.getPoll()));
                }
                Optional<Option> option = optionRepository.findById(v.getOption());
                if (option.isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                        String.format("% not found", v.getOption()));
                }
                Vote vote = new Vote(v.getVoteId(), v.getUsername(), poll.get(), option.get());
                voteRepository.save(vote);
                return ResponseEntity.ok(VoteOutput.fromVote(vote));
        }

        @Operation(summary = "Kitöröl egy vote objektumot id alapján idempotens módon")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Kitöröl egy vote objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett. A hivatkozó objektumokból is kitörli a rá mutatő referenciát.", content = {
                                        @Content(schema = @Schema(implementation = String.class)) }) })
        @DeleteMapping("/{id}")
        ResponseEntity<String> deleteVote(@PathVariable(value = "id") final String voteId) {
                voteRepository.deleteById(voteId);
                return ResponseEntity.ok(String.format("\"%s\"", voteId));
        }
}
